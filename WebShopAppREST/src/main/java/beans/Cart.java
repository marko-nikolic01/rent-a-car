package beans;

import java.util.ArrayList;

public class Cart {
	private User user;
	private ArrayList<Order> orders = new ArrayList<>();
	private double price;
	
	public Cart() {
		user = new User();
		price = 0;
	}

	public Cart(User user) {
		super();
		this.user = user;
		price = 0;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public ArrayList<Order> getOrders() {
		return orders;
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
	
	public void clear() {
		this.orders.clear();
	}
}
