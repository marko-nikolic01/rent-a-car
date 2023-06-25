package beans;

import utilities.Fuel;
import utilities.RentalStatus;
import utilities.Transmission;
import utilities.VehicleType;

public class Vehicle {
	private int id;
	private String brand;
	private String model;
	private double price;
	private VehicleType type;
	private Transmission transmission;
	private Fuel fuel;
	private double fuelConsumption;
	private int doors;
	private int numberOfPassengers;
	private String description;
	private String photoURL;
	private RentalStatus status;
	private int rentACarObjectId;
	private boolean isDeleted;
	
	public Vehicle() {
		id = -1;
		brand = "";
		model = "";
		price = 0;
		type = VehicleType.CAR;
		transmission = Transmission.MANUAL;
		fuel = Fuel.DIESEL;
		fuelConsumption = 0;
		doors = 0;
		numberOfPassengers = 0;
		description = "";
		photoURL = "";
		status = RentalStatus.AVAILABLE;
		rentACarObjectId = -1;
		isDeleted = false;
	}
	
	

	public Vehicle(int id, String brand, String model, double price, VehicleType type, Transmission transmission, Fuel fuel,
			double fuelConsumption, int doors, int numberOfPassengers, String description, String photoURL,
			RentalStatus status, int rentACarObjectId, boolean isDeleted) {
		super();
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.type = type;
		this.transmission = transmission;
		this.fuel = fuel;
		this.fuelConsumption = fuelConsumption;
		this.doors = doors;
		this.numberOfPassengers = numberOfPassengers;
		this.description = description;
		this.photoURL = photoURL;
		this.status = status;
		this.rentACarObjectId = rentACarObjectId;
		this.isDeleted = isDeleted;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public VehicleType getType() {
		return type;
	}

	public void setType(VehicleType type) {
		this.type = type;
	}
	
	public Transmission getTransmission() {
		return transmission;
	}

	public void setTransmission(Transmission transmission) {
		this.transmission = transmission;
	}

	public Fuel getFuel() {
		return fuel;
	}

	public void setFuel(Fuel fuel) {
		this.fuel = fuel;
	}

	public double getFuelConsumption() {
		return fuelConsumption;
	}

	public void setFuelConsumption(double fuelConsumption) {
		this.fuelConsumption = fuelConsumption;
	}

	public int getDoors() {
		return doors;
	}

	public void setDoors(int doors) {
		this.doors = doors;
	}

	public int getNumberOfPassengers() {
		return numberOfPassengers;
	}

	public void setNumberOfPassengers(int numberOfPassengers) {
		this.numberOfPassengers = numberOfPassengers;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPhotoURL() {
		return photoURL;
	}

	public void setPhotoURL(String photoURL) {
		this.photoURL = photoURL;
	}

	public RentalStatus getStatus() {
		return status;
	}

	public void setStatus(RentalStatus status) {
		this.status = status;
	}

	public int getRentACarObjectId() {
		return rentACarObjectId;
	}

	public void setRentACarObjectId(int rentACarObjectId) {
		this.rentACarObjectId = rentACarObjectId;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void delete() {
		this.isDeleted = true;
	}
}
