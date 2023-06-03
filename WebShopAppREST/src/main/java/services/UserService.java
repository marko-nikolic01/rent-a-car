package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.User;
import dao.UserDAO;
import dto.SignInCredentialsDTO;

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
		if (user.isValid() && !dao.userExists(user.getUsername())) {
			return dao.save(user);
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
}
