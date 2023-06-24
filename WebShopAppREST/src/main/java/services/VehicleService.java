package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.RentACarObject;
import beans.User;
import beans.Vehicle;
import dao.RentACarObjectDAO;
import dao.UserDAO;
import dao.VehicleDAO;
import dto.SignInCredentialsDTO;
import dto.UserUsernameDTO;
import dto.VehicleCreationDTO;

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
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		RentACarObjectDAO rentACarObjectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		Collection<RentACarObject> objects = rentACarObjectDAO.getAll();
		vehicleDAO.linkRentACarObjects(objects);
	}
	
	@GET
	@Path("/getByObject")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Vehicle> getVehiclesByObjectId(int id) {
		VehicleDAO dao = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		return dao.getByObjectId(id);
	}
	
	@POST
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle create(Vehicle vehicle) {
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		RentACarObjectDAO rentACarObjectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		Vehicle newVehicle = vehicleDAO.save(vehicle);
		RentACarObject object = rentACarObjectDAO.getById(vehicle.getRentACarObject().getId());
		object.getVehicles().add(newVehicle);
		return newVehicle;
	}
}