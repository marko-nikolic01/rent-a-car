package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.RentACarObject;
import beans.User;
import beans.Vehicle;
import dao.RentACarObjectDAO;
import dao.UserDAO;
import dao.VehicleDAO;
import dto.RentACarObjectWithManagerDTO;

@Path("/rentACarObjects")
public class RentACarObjectService {
	@Context
	ServletContext servletContext;
	
	public RentACarObjectService() {
		
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
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		RentACarObjectDAO rentACarObjectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		Collection<Vehicle> objects = vehicleDAO.getAll();
		rentACarObjectDAO.linkVehicles(objects);
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<RentACarObject> getRentACarObjects() {
		RentACarObjectDAO dao = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public RentACarObject getById(@PathParam("id") int id) {
		RentACarObjectDAO dao = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		return dao.getById(id);
	}
	
	@GET
	@Path("/sortedByWorkingStatus")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<RentACarObject> getSortedRentACarObjects() {
		return sortByWorkingStatus(getWorkingRentACarObjects());
	}
	
	@GET
	@Path("/working")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<RentACarObject> getWorkingRentACarObjects() {
		RentACarObjectDAO dao = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		return dao.getWorking();
	}
	
	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	public RentACarObject create(RentACarObjectWithManagerDTO object) {
		RentACarObjectDAO objectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		UserDAO userDAO = (UserDAO) servletContext.getAttribute("userDAO");
		
		RentACarObject newObject = objectDAO.save(object.getRentACarObject());
		User manager = userDAO.getById(object.getManagerId());
		manager.setRentACarObject(newObject);
		userDAO.toCSV();
		return newObject;
	}
	
	public Collection<RentACarObject> sortByWorkingStatus(Collection<RentACarObject> rentACarObjects) {
		Collection<RentACarObject> sorted = new ArrayList<>();
		Collection<RentACarObject> closed = new ArrayList<>();
		
		for (RentACarObject rentACarObject : rentACarObjects) {
			if (rentACarObject.isOpen()) {
				sorted.add(rentACarObject);
			}
			else if (rentACarObject.isClosed()) {
				closed.add(rentACarObject);
			}
		}
		
		sorted.addAll(closed);
		
		return sorted;
	}
}
