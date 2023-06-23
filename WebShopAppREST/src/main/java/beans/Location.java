package beans;

import java.util.StringTokenizer;

import utilities.Address;

public class Location {
	public static String delimiter = "|";
	
	private double longitude;
	private double latitude;
	private Address address;
	
	public Location() {
		longitude = 0;
		latitude = 0;
		address = new Address();
	}
	
	public Location(double longitude, double latitude, Address address) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
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
	
	public static Location parseLocation(String text) {
		String[] tokens = text.split(delimiter);
		
		StringTokenizer st = new StringTokenizer(text, delimiter);
		
		double longitude = Double.parseDouble(st.nextToken());
		double latitude = Double.parseDouble(st.nextToken());
		Address address = Address.parseAddress(st.nextToken());
		
		return new Location(longitude, latitude, address);
	}

	@Override
	public String toString() {
		return "" + longitude + delimiter + latitude + delimiter + address;
	}
}
