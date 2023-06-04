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
		WorkingHours workingHours = WorkingHours.of(LocalTime.of(7, 0), LocalTime.of(13, 0));
		Address address = Address.of("Novi Sad", "Somborska", 52, 21000);
		Location location = new Location(1, 45.4565, 45.69, address);
		String logoURL = "https://www.auto-rad.rs/group/registracija-vozila/wp-content/uploads/sites/8/2021/04/KV5A2445-Edit.jpg";
		double rating = 4;
		
		RentACarObject obj1 = new RentACarObject(1, "Auto centar ACA", workingHours, true, location, logoURL, rating);

		WorkingHours workingHours2 = WorkingHours.of(LocalTime.of(7, 0), LocalTime.of(20, 0));
		Address address2 = Address.of("Beograd", "Somborska", 26, 11000);
		Location location2 = new Location(1, 45.4565, 45.69, address2);
		RentACarObject obj2 = new RentACarObject(2, "Auto Rad", workingHours2, true, location2, logoURL, rating);

		WorkingHours workingHours3 = WorkingHours.of(LocalTime.of(8, 0), LocalTime.of(19, 0));
		RentACarObject obj3 = new RentACarObject(3, "Auto skola Lika", workingHours3, false, location, logoURL, rating);
		
		rentACarObjects.add(obj1);
		rentACarObjects.add(obj2);
		rentACarObjects.add(obj3);
	}
}
