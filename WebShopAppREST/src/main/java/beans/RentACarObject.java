package beans;

import utilities.WorkingHours;

public class RentACarObject {
	private int id;
	private String name;
	private WorkingHours workingHours;
	private boolean isWorking;
	private Location location;
	private String logoURL;
	private double rating;
	
	public RentACarObject() {
		id = -1;
		name = "";
		workingHours = WorkingHours.of(10, 0, 10, 10);
		isWorking = false;
		location = new Location();
		logoURL = "";
		rating = 0.0;
	}
	
	public RentACarObject(int id, String name, WorkingHours workingHours, boolean isWorking, Location location,
			String logoURL, double rating) {
		super();
		this.id = id;
		this.name = name;
		this.workingHours = workingHours;
		this.isWorking = isWorking;
		this.location = location;
		this.logoURL = logoURL;
		this.rating = rating;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public WorkingHours getWorkingHours() {
		return workingHours;
	}

	public void setWorkingHours(WorkingHours workingHours) {
		this.workingHours = workingHours;
	}

	public boolean isWorking() {
		return isWorking;
	}

	public void setWorking(boolean isWorking) {
		this.isWorking = isWorking;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogoURL() {
		return logoURL;
	}

	public void setLogoURL(String logoURL) {
		this.logoURL = logoURL;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public boolean isOpen() {
		return workingHours.isOpen() && isWorking;
	}
	
	public boolean isClosed() {
		return !workingHours.isOpen() && isWorking;
	}
}
