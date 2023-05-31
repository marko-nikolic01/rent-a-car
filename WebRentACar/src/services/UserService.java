package services;



import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.User;
import dao.UserDAO;

@Path("/users")
public class UserService {
	
	@Context
	ServletContext servletContext;
	
	public UserService() {
		
	}
	
	@PostConstruct
	private void initialize() {
		if (servletContext.getAttribute("userDAO") == null) {
	    	String contextPath = servletContext.getRealPath("");
	    	servletContext.setAttribute("userDAO", new UserDAO());
		}
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public User signUp(User user) {
		UserDAO userDAO = (UserDAO) servletContext.getAttribute("userDAO");
		if(user.isValid()) {
			//return userDAO.save(user);
		}
		return null;
	}
	
}
