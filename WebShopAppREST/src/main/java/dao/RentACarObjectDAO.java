package dao;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;

import beans.Location;
import beans.RentACarObject;
import utilities.Address;
import utilities.WorkingHours;
import utilities.WorkingStatus;

public class RentACarObjectDAO {
	private String filePath = "rentACarObjects.csv";
	private ArrayList<RentACarObject> rentACarObjects = new ArrayList<>();
	
	public RentACarObjectDAO() { }
	
	public RentACarObjectDAO(String contextPath) {
		String path = contextPath + filePath;
		load(path);
	}
	
	public Collection<RentACarObject> getAll() {
		return rentACarObjects;
	}
	
	private void load(String path) {
		WorkingHours workingHours = WorkingHours.of(LocalTime.of(7, 0), LocalTime.of(20, 0));
		WorkingStatus workingStatus = WorkingStatus.WORKING;
		Address address = Address.of("Novi Sad", "Somborska", 52, 21000);
		Location location = new Location(1, 45.4565, 45.69, address);
		String logoURL = "https://www.auto-rad.rs/group/registracija-vozila/wp-content/uploads/sites/8/2021/04/KV5A2445-Edit.jpg";
		double rating = 4;
		boolean isDeleted = false;
		RentACarObject obj1 = new RentACarObject(1, "Auto centar ACA", workingHours, workingStatus, location, logoURL, rating, isDeleted);
		RentACarObject obj2 = new RentACarObject(2, "Auto Rad", workingHours, workingStatus, location, logoURL, rating, isDeleted);
		
		rentACarObjects.add(obj1);
		rentACarObjects.add(obj2);
	}
}
