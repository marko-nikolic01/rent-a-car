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

import beans.Order;
import beans.RentACarObject;
import beans.User;
import beans.Vehicle;
import dao.OrderCancellationDAO;
import dao.OrderDAO;
import dao.RentACarObjectDAO;
import dao.UserDAO;
import dao.VehicleDAO;
import dto.SignInCredentialsDTO;
import dto.UserUsernameDTO;
import utilities.Role;

@Path("/users")
public class UserService {
	@Context
	ServletContext servletContext;

	public UserService() {

	}

	@PostConstruct
	public void init() {
		if (servletContext.getAttribute("userDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("userDAO", new UserDAO(contextPath));
		}
		if (servletContext.getAttribute("rentACarObjectDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("rentACarObjectDAO", new RentACarObjectDAO(contextPath));
		}
		if (servletContext.getAttribute("vehicleDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("vehicleDAO", new VehicleDAO(contextPath));
		}
		if (servletContext.getAttribute("orderDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("orderDAO", new OrderDAO(contextPath));
		}
		
		if (servletContext.getAttribute("orderCancellationDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("orderCancellationDAO", new OrderCancellationDAO(contextPath));
		}
		
		UserDAO userDAO = (UserDAO) servletContext.getAttribute("userDAO");
		RentACarObjectDAO rentACarObjectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		OrderDAO orderDAO = (OrderDAO) servletContext.getAttribute("orderDAO");
		Collection<RentACarObject> objects = rentACarObjectDAO.getAll();
		Collection<Vehicle> vehicles = vehicleDAO.getAll();
		Collection<Order> orders = orderDAO.getAll();
		userDAO.linkRentACarObjects(objects);
		userDAO.linkOrders(orders);
		orderDAO.linkRentACarObjects(objects);
		orderDAO.linkVehicles(vehicles);
	}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsers() {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		return dao.getAll();
	}

	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User singUp(User user) {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		if (user.isValid() && !dao.userWithUsernameExists(user.getUsername())) {
			return dao.signUp(user);
		}
		return null;
	}
	
	@POST
	@Path("/signIn")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User signIn(SignInCredentialsDTO credentials) {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		emptyCart();
		return dao.signInBySignInCredentials(credentials);
	}
	
	public void emptyCart() {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		User user = dao.getSignedInUser();
		if(user != null) {			
			user.getCart().clear();
		}
	}
	
	@GET
	@Path("/signedInUser")
	@Produces(MediaType.APPLICATION_JSON)
	public User getSignedInUser() {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		return dao.getSignedInUser();
	}
	
	@PUT
	@Path("/editProfile")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User updateUser(User updatedUser) {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		return dao.update(updatedUser);
	}
	
	@PUT
	@Path("/block/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User block(@PathParam("id") int id) {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		User user = dao.getById(id);
		if(user.getRole() != Role.ADMINISTRATOR) {
			user.setBlocked(true);
			dao.toCSV();
		}
		return user;
	}
	
	@DELETE
	@Path("/deleteByUsername")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User deleteUserByUsername(UserUsernameDTO user) {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		return dao.deleteByUsername(user.getUsername());
	}
	
	@DELETE
	@Path("/deleteAllUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> deleteAllUsers() {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		return dao.deleteAll();
	}
	
	@GET
	@Path("/unassignedManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUnassignedManagers() {
		UserDAO dao = (UserDAO) servletContext.getAttribute("userDAO");
		return dao.getUnassignedManagers();
	}
}
