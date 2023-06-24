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
import dao.RentACarObjectDAO;
import dao.UserDAO;
import dto.SignInCredentialsDTO;
import dto.UserUsernameDTO;

@Path("/users")
public class UserService {
	@Context
	ServletContext servletContext;

	public UserService() {

	}

	@PostConstruct
	public void init() {
		boolean userDAOinitialized = true;
		
		if (servletContext.getAttribute("userDAO") == null) {
			userDAOinitialized = false;
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("userDAO", new UserDAO(contextPath));
		}

		boolean rentACarObjectDAOinitialized = true;
		if (servletContext.getAttribute("rentACarObjectDAO") == null) {
			rentACarObjectDAOinitialized = false;
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("rentACarObjectDAO", new RentACarObjectDAO(contextPath));
		}
		
		UserDAO userDAO = (UserDAO) servletContext.getAttribute("userDAO");
		RentACarObjectDAO rentACarObjectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		Collection<RentACarObject> objects = rentACarObjectDAO.getAll();
		
		userDAO.linkRentACarObjects(objects);
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
		return dao.signInBySignInCredentials(credentials);
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
