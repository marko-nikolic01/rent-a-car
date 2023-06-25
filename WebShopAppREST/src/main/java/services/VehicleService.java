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
import dto.SignInCredentialsDTO;
import dto.UserUsernameDTO;

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
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Vehicle> getVehicles() {
		VehicleDAO dao = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		return dao.getAll();
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
}
