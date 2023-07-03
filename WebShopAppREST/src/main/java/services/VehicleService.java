package services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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
import beans.Vehicle;
import dao.OrderDAO;
import dao.RentACarObjectDAO;
import dao.UserDAO;
import dao.VehicleDAO;
import dto.DateRangeDTO;

@Path("/vehicles")
public class VehicleService {
	@Context
	ServletContext servletContext;

	public VehicleService() {

	}

	@PostConstruct
	public void init() {
		if (servletContext.getAttribute("vehicleDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("vehicleDAO", new VehicleDAO(contextPath));
		}
		if (servletContext.getAttribute("rentACarObjectDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("rentACarObjectDAO", new RentACarObjectDAO(contextPath));
		}
		if (servletContext.getAttribute("orderDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("orderDAO", new OrderDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Vehicle> getVehicles() {
		VehicleDAO dao = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/available")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Vehicle> getAvailableVehicles() {
		VehicleDAO dao = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		return dao.getAvailable();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle getVehicle(@PathParam("id") int id) {
		VehicleDAO dao = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		return dao.getById(id);
	}
	
	@GET
	@Path("/getByObject")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Vehicle> getVehiclesByObjectId(int id) {
		VehicleDAO dao = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		return dao.getByObjectId(id);
	}
	
	@GET
	@Path("/getByObject/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Vehicle> getVehiclesByObject(@PathParam("id") int id) {
		VehicleDAO dao = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		return dao.getByObjectId(id);
	}
	
	@POST
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void create(Vehicle vehicle) {
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		RentACarObjectDAO rentACarObjectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		Vehicle newVehicle = vehicleDAO.save(vehicle);
		RentACarObject object = rentACarObjectDAO.getById(vehicle.getRentACarObjectId());
		vehicle.setRentACarObjectId(object.getId());
		object.getVehicles().add(newVehicle);
	}
	
	@DELETE
	@Path("/delete/{id}")
	public void delete(@PathParam("id") int id) {
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		RentACarObjectDAO rentACarObjectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		vehicleDAO.delete(id);
		rentACarObjectDAO.linkVehicles(vehicleDAO.getAll());
	}
	
	@PUT
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle edit(Vehicle updatedVehicle) {
		VehicleDAO dao = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		return dao.update(updatedVehicle);
	}
	
	@POST
	@Path("/availableInDateRange")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<Vehicle> getVehiclesAvailableInDateRange(DateRangeDTO dateRange) {
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		
		List<Vehicle> filtered = new ArrayList<>();
		
		for (Vehicle vehicle : vehicleDAO.getAvailable()) {
			if (isVehicleAvailableInDateRange(vehicle.getId(), dateRange)) {
				filtered.add(vehicle);
			}
		}
		
		return filtered;
	}
	
	@GET
	@Path("/isVehicleAvailableInDateRange/{vehicleId}")
	@Produces(MediaType.TEXT_PLAIN)
	public boolean isVehicleAvailableInDateRange(@PathParam("vehicleId") int vehicleId, DateRangeDTO dateRange) {
		OrderDAO orderDAO = (OrderDAO) servletContext.getAttribute("orderDAO");
		UserDAO userDAO = (UserDAO) servletContext.getAttribute("userDAO");
		
		if (!isStartDateBeforeEndDate(dateRange.getStartDate(), dateRange.getEndDate())) {
			return false;
		}
		
		Collection<Order> orders = orderDAO.getByVehicleId(vehicleId);
		
		for (Order order : userDAO.getSignedInUser().getCart().getOrders()) {
			if (order.getVehicle().getId() == vehicleId) {
				orders.add(order);
			}
		}
		
		for (Order order : orders) {
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
