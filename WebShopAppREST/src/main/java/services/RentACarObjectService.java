package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.RentACarObject;
import dao.RentACarObjectDAO;

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
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<RentACarObject> getRentACarObjects() {
		RentACarObjectDAO dao = (RentACarObjectDAO) servletContext.getAttribute("rentACarObjectDAO");
		return dao.getAll();
	}
}
