package services;

import java.time.LocalDateTime;
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

import beans.Comment;
import beans.Order;
import beans.RentACarObject;
import beans.User;
import beans.Vehicle;
import dao.CommentDAO;
import dao.OrderDAO;
import dao.RentACarObjectDAO;
import dao.UserDAO;
import dao.VehicleDAO;
import dto.SignInCredentialsDTO;
import dto.UserUsernameDTO;
import utilities.OrderStatus;
import utilities.RentalStatus;

@Path("/comments")
public class CommentService {
	@Context
	ServletContext servletContext;

	public CommentService() {

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
		if (servletContext.getAttribute("commentDAO") == null) {
			String contextPath = servletContext.getRealPath("");
			servletContext.setAttribute("commentDAO", new CommentDAO(contextPath));
		}
		VehicleDAO vehicleDAO = (VehicleDAO) servletContext.getAttribute("vehicleDAO");
		RentACarObjectDAO rentACarObjectDAO = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		OrderDAO orderDAO = (OrderDAO) servletContext.getAttribute("orderDAO");
		CommentDAO commentDAO = (CommentDAO) servletContext.getAttribute("commentDAO");
		Collection<Vehicle> objects = vehicleDAO.getAll();
		rentACarObjectDAO.linkVehicles(objects);
		commentDAO.linkOrders(orderDAO.getAll());
	}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getComments() {
		CommentDAO dao = (CommentDAO) servletContext.getAttribute("commentDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getCommentsByObject(@PathParam("id") int id) {
		CommentDAO dao = (CommentDAO) servletContext.getAttribute("commentDAO");
		return dao.getByObject(id);
	}
	
	@GET
	@Path("/approved/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getApprovedCommentsByObject(@PathParam("id") int id) {
		CommentDAO dao = (CommentDAO) servletContext.getAttribute("commentDAO");
		return dao.getApprovedByObject(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Comment createComment(Comment comment) {
		if(comment.getText() == "" || comment.getRating() < 1 || comment.getRating() > 5)
			return null;
		CommentDAO dao = (CommentDAO) servletContext.getAttribute("commentDAO");
		return dao.save(comment);
	}
	
	@PUT
	@Path("/approve/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void approveComment(@PathParam("id") int id) {
		
	}
	
}
