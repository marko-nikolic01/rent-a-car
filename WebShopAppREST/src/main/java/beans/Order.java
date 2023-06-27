package beans;

import java.time.LocalDateTime;

import utilities.OrderStatus;

public class Order {
	private String orderCode;
	private Vehicle vehicle;
	private RentACarObject rentACarObject;
	private LocalDateTime orderDateTime;
	private int durationDays;
	private double price;
	private User customer;
	private OrderStatus status;
		
	public Order(String orderCode, Vehicle vehicle, RentACarObject rentACarObject, LocalDateTime orderDateTime,
			int durationDays, double price, User customer, OrderStatus status) {
		super();
		this.orderCode = orderCode;
		this.vehicle = vehicle;
		this.rentACarObject = rentACarObject;
		this.orderDateTime = orderDateTime;
		this.durationDays = durationDays;
		this.price = price;
		this.customer = customer;
		this.status = status;
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
	public User getCustomer() {
		return customer;
	}
	public void setCustomer(User customer) {
		this.customer = customer;
	}
	public OrderStatus getStatus() {
		return status;
	}
	public void setStatus(OrderStatus status) {
		this.status = status;
	}
}
