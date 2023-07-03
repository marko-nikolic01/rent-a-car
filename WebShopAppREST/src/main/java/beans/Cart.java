package beans;

import java.util.ArrayList;

public class Cart {
	private User user;
	private ArrayList<Order> orders = new ArrayList<>();
	private double price;
	
	public Cart() {
		this.user = new User();
		this.price = 0;
	}

	public Cart(User user) {
		super();
		this.user = user;
		this.price = 0;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public ArrayList<Order> getOrders() {
		return this.orders;
	}

	public void setOrders(ArrayList<Order> orders) {
		this.orders = orders;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	public void add(Order order) {
		this.orders.add(order);
		double value = (1 - user.getType().getDiscount() / 100) * order.getPrice();
		this.price += value;
	}
	
	public void remove(Order order) {
		this.orders.remove(order);
		double value = (1 - user.getType().getDiscount() / 100) * order.getPrice();
		this.price -= value;
	}
	
	public void clear() {
		this.orders.clear();
		this.price = 0;
	}
}
