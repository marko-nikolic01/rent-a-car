package beans;

import utilities.Address;

public class Location {
	private int id;
	private double longitude;
	private double latitude;
	private Address address;
	
	public Location() {
		id = -1;
		longitude = 0;
		latitude = 0;
		address = new Address();
	}
	
	public Location(int id, double longitude, double latitude, Address address) {
		super();
		this.id = id;
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
}
