package beans;

import utilities.WorkingHours;
import utilities.WorkingStatus;

public class RentACarObject {
	private int id;
	private String name;
	private WorkingHours workingHours;
	private WorkingStatus workingStatus;
	private Location location;
	private String logoURL;
	private double rating;
	private boolean isDeleted;
	
	public RentACarObject() { }
	
	public RentACarObject(int id, String name, WorkingHours workingHours, WorkingStatus workingStatus,
			Location location, String logoPath, double rating, boolean isDeleted) {
		super();
		this.id = id;
		this.name = name;
		this.workingHours = workingHours;
		this.workingStatus = workingStatus;
		this.location = location;
		this.logoURL = logoPath;
		this.rating = rating;
		this.isDeleted = isDeleted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
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

	public WorkingStatus getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(WorkingStatus workingStatus) {
		this.workingStatus = workingStatus;
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

	public void setLogoURL(String logoPath) {
		this.logoURL = logoPath;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}
}
