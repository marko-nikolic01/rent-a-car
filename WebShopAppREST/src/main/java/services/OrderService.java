package services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Order;
import beans.User;
import beans.Vehicle;
import dao.OrderDAO;
import dao.RentACarObjectDAO;
import dao.UserDAO;
import dao.VehicleDAO;
import dto.DateRangeDTO;
import utilities.OrderStatus;
import utilities.RentalStatus;

@Path("/orders")
public class OrderService {
	@Context
	ServletContext servletContext;

	public OrderService() {
		
	}

	@PostConstruct
	public void init() {
		if (servletContext.getAttribute("rentACarObjectDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("rentACarObjectDAO", new RentACarObjectDAO(contextPath));
		}
		if (servletContext.getAttribute("userDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("userDAO", new UserDAO(contextPath));
		}
		if (servletContext.getAttribute("vehicleDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("vehicleDAO", new VehicleDAO(contextPath));
		}
		if (servletContext.getAttribute("orderDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("orderDAO", new OrderDAO(contextPath));
		}
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		RentACarObjectDAO rentACarObjectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		Collection<Vehicle> objects = vehicleDAO.getAll();
		rentACarObjectDAO.linkVehicles(objects);
	}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getOrders() {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/getByRentACarObject/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> getOrdersByRentACarObject(@PathParam("id") int id) {
		OrderDAO dao = (OrderDAO) servletContext.getAttribute("orderDAO");
		return dao.getByRentACarObjectId(id);
	}
	
	@PUT
	@Path("/return/{code}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Order returnOrder(@PathParam("code") String code) {
		OrderDAO orderDAO = (OrderDAO) servletContext.getAttribute("orderDAO");
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		
		Order order = orderDAO.getByCode(code);
		if(order.getStatus() != OrderStatus.TAKEN) 
			return null;
		Vehicle vehicle = order.getVehicle();
		
		order.setStatus(OrderStatus.RETURNED);
		vehicle.setStatus(RentalStatus.AVAILABLE);
		orderDAO.toCSV();
		vehicleDAO.toCSV();
		return order;
	}
	
	@PUT
	@Path("/take/{code}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Order takeOrder(@PathParam("code") String code) {
		OrderDAO orderDAO = (OrderDAO) servletContext.getAttribute("orderDAO");
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		
		Order order = orderDAO.getByCode(code);
		if((order.getStatus() != OrderStatus.ACCEPTED) || order.getOrderDateTime().isAfter(LocalDateTime.now())) 
			return null;
		Vehicle vehicle = order.getVehicle();
		
		order.setStatus(OrderStatus.TAKEN);
		vehicle.setStatus(RentalStatus.RENTED);
		orderDAO.toCSV();
		vehicleDAO.toCSV();
		return order;
	}
	
	@GET
	@Path("/isVehicleAvailableInDateRange/{vehicleId}")
	@Produces(MediaType.TEXT_PLAIN)
	public boolean isVehicleAvailableInDateRagne(@PathParam("vehicleId") int vehicleId, DateRangeDTO dateRange) {
		OrderDAO orderDAO = (OrderDAO) servletContext.getAttribute("orderDAO");
		
		if (!isStartDateBeforeEndDate(dateRange.getStartDate(), dateRange.getEndDate())) {
			return false;
		}
		
		for (Order order : orderDAO.getByVehicleId(vehicleId)) {
			if (isOrderInDateRange(order, dateRange)) {
				return false;
			}
		}
		
		return true;
	}
	
	public boolean isOrderInDateRange(Order order, DateRangeDTO dateRange) {
		return isOrderInDateRange(order, dateRange.getStartDate(), dateRange.getEndDate());
	}
	
	public boolean isOrderInDateRange(Order order, LocalDate startDate, LocalDate endDate) {
		return isDateInDateRange(order.getStartDate(), startDate, endDate) || isDateInDateRange(order.getEndDate(), startDate, endDate);
	}
	
	private boolean isDateInDateRange(LocalDate date, LocalDate startDate, LocalDate endDate) {
		return (date.isAfter(startDate) || date.isEqual(startDate)) && (date.isBefore(endDate) || date.isEqual(endDate));
	}
	
	private boolean isStartDateBeforeEndDate(LocalDate startDate, LocalDate endDate) {
		return startDate.isBefore(endDate) || startDate.isEqual(endDate);
	}
}
