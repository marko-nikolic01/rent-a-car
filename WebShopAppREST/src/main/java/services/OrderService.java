package services;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Order;
import beans.RentACarObject;
import beans.User;
import beans.Vehicle;
import dao.OrderDAO;
import dao.RentACarObjectDAO;
import dao.UserDAO;
import dao.VehicleDAO;
import dto.NewOrderDTO;
import utilities.AlphaNumericCodeGenerator;
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
	
	@POST
	@Path("/addOrderToCart")
	public Order createOrder(NewOrderDTO dto) {
		OrderDAO orderDAO = (OrderDAO) servletContext.getAttribute("orderDAO");
		UserDAO userDAO = (UserDAO) servletContext.getAttribute("userDAO");
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		RentACarObjectDAO rentACarObjectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		
		User user = userDAO.getById(dto.getCustomerId());
		Vehicle vehicle = vehicleDAO.getById(dto.getVehicleId());
		RentACarObject object = rentACarObjectDAO.getById(vehicle.getRentACarObjectId());
		
		AlphaNumericCodeGenerator generator = new AlphaNumericCodeGenerator();
		
		Order order = new Order();
		order.setCustomerId(user.getId());
		order.setCustomerName(user.getFirstName() + " " + user.getLastName());
		order.setVehicle(vehicle);
		order.setRentACarObject(object);
		order.setOrderCode(generator.generate(10));
		order.setOrderDateTime(dto.getStartDate().atStartOfDay());
		order.setDurationDays((int)Duration.between(dto.getStartDate().atStartOfDay(), dto.getEndDate().atStartOfDay()).toDays());
		order.setPrice(order.getDurationDays() * vehicle.getPrice());
		order.setStatus(OrderStatus.PROCESSING);
		order.setRated(false);
		
		user.getCart().getOrders().add(order);
		orderDAO.getAll().add(order);
		
		for (Order o : user.getCart().getOrders()) {
			System.out.println(o.getOrderCode());
		}
		
		return order;
	}
}
