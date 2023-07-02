package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;


import utilities.OrderStatus;

public class Order {
	private String orderCode;
	private Vehicle vehicle;
	private RentACarObject rentACarObject;
	private LocalDateTime orderDateTime;
	private int durationDays;
	private double price;
	private String customerName;
	private int customerId;
	private OrderStatus status;
	private boolean isRated;
	
	public boolean isRated() {
		return isRated;
	}

	public void setRated(boolean isRated) {
		this.isRated = isRated;
	}

	public Order() {
		orderCode = "";
		vehicle = new Vehicle();
		rentACarObject = new RentACarObject();
		orderDateTime = LocalDateTime.now();
		durationDays = 0;
		price = 0;
		customerName = "";
		customerId = 0;
		status = OrderStatus.PROCESSING;
		isRated = false;
	}
	
	public Order(String orderCode, Vehicle vehicle, RentACarObject rentACarObject, LocalDateTime orderDateTime,
			int durationDays, double price, String customerName, int customerId, OrderStatus status, boolean isRated) {
		super();
		this.orderCode = orderCode;
		this.vehicle = vehicle;
		this.rentACarObject = rentACarObject;
		this.orderDateTime = orderDateTime;
		this.durationDays = durationDays;
		this.price = price;
		this.customerName = customerName;
		this.customerId = customerId;
		this.status = status;
		this.isRated = isRated;
	}
	
	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public String getOrderCode() {
		return orderCode;
	}
	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}
	public Vehicle getVehicle() {
		return vehicle;
	}
	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}
	public RentACarObject getRentACarObject() {
		return rentACarObject;
	}
	public void setRentACarObject(RentACarObject rentACarObject) {
		this.rentACarObject = rentACarObject;
	}
	public LocalDateTime getOrderDateTime() {
		return orderDateTime;
	}
	public void setOrderDateTime(LocalDateTime orderDateTime) {
		this.orderDateTime = orderDateTime;
	}
	public int getDurationDays() {
		return durationDays;
	}
	public void setDurationDays(int durationDays) {
		this.durationDays = durationDays;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public OrderStatus getStatus() {
		return status;
	}
	public void setStatus(OrderStatus status) {
		this.status = status;
	}
	
	public LocalDate getStartDate() {
		return orderDateTime.toLocalDate();
	}
	
	public LocalDate getEndDate() {
		return orderDateTime.toLocalDate().plusDays(durationDays);
	}
}
