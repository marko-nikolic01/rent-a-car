package utilities;

public class Address {
	public String city;
	public String street;
	public int streetNumber;
	public int zipCode;
	
	public Address() { }
	
	public Address(String city, String street, int streetNumber, int zipCode) {
		super();
		this.city = city;
		this.street = street;
		this.streetNumber = streetNumber;
		this.zipCode = zipCode;
	}

	@Override
	public String toString() {
		return city + '/' + street + '/' + streetNumber + '/' + zipCode;
	}
	
	public void parse(String address) {
		String[] values = address.split("/");
		city = values[0];
		street = values[1];
		streetNumber = Integer.parseInt(values[2]);
		zipCode = Integer.parseInt(values[3]);
	}
	
	public static Address parseAddress(String address) {
		Address newAddress = new Address();
		newAddress.parse(address);
		return newAddress;
	}
	
	public static Address of(String city, String street, int streetNumber, int zipCode) {
		return new Address(city, street, streetNumber, zipCode);
	}
}
