package dao;

import java.util.ArrayList;
import java.util.List;

import beans.Order;

public class OrderDAO {
	private String path = "orders.csv";
	private List<Order> orders = new ArrayList<>();
	
	public OrderDAO() {}
	
	public OrderDAO(String contextPath) {
		path = contextPath + this.path;
		load();
	}
	
	private void load() {
		
	}
}
