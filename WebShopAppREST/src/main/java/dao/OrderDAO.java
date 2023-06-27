package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.StringTokenizer;

import beans.Order;
import beans.RentACarObject;
import beans.User;
import beans.Vehicle;
import utilities.AlphaNumericCodeGenerator;
import utilities.OrderStatus;

public class OrderDAO {
	private String path = "orders.csv";
	private List<Order> orders = new ArrayList<>();
	
	public OrderDAO() {}
	
	public OrderDAO(String contextPath) {
		path = contextPath + this.path;
		load();
	}
	
	public void linkRentACarObjects(Collection<RentACarObject> objects) {
		for (Order order : orders) {
			for (RentACarObject rentACarObject : objects) {
				if (order.getRentACarObject().getId() == rentACarObject.getId()) {
					order.setRentACarObject(rentACarObject);
					break;
				}
			}
		}
	}
	
	public void linkVehicles(Collection<Vehicle> objects) {
		for (Order order : orders) {
			for (Vehicle vehicle : objects) {
				if (order.getRentACarObject().getId() == vehicle.getId()) {
					order.setVehicle(vehicle);
					break;
				}
			}
		}
	}
	
	public Collection<Order> getAll() {
		return orders;
	}
	
	public Order save(Order order) {
		order.setOrderCode(generateOrderCode());
		orders.add(order);
		toCSV();
		return order;
	}
	
	private String generateOrderCode() {
		AlphaNumericCodeGenerator generator = new AlphaNumericCodeGenerator();
		boolean unique = true;
		while(!unique) {
			String code = generator.generate(10);
			for(Order order : orders) {
				if(code.equals(order.getOrderCode())) {
					continue;
				}
			}
		}
		return code;
	}
	
	private void load() {
		BufferedReader reader = null;
		try {
			File file = new File(path);
			reader = new BufferedReader(new FileReader(file));

			String line;
			String orderCode = null;
			Vehicle vehicle = new Vehicle();
			RentACarObject rentACarObject = new RentACarObject();
			LocalDateTime orderDateTime = LocalDateTime.now();
			int duration = 0;
			double price = 0;
			String customerName = null;
			int customerId = 0;
			OrderStatus status = OrderStatus.PROCESSING;

			StringTokenizer st;
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0) {
					continue;
				}
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					orderCode = st.nextToken().trim();
					vehicle.setId(Integer.parseInt(st.nextToken().trim()));
					rentACarObject.setId(Integer.parseInt(st.nextToken().trim()));
					orderDateTime = LocalDateTime.parse(st.nextToken().trim());
					duration = Integer.parseInt(st.nextToken().trim());
					price = Double.parseDouble(st.nextToken().trim());
					customerName = st.nextToken().trim();
					customerId = Integer.parseInt(st.nextToken().trim());
					status = OrderStatus.valueOf(st.nextToken().trim());
				}
				
				Order order = new Order(orderCode, vehicle, rentACarObject, orderDateTime, duration, price, customerName, customerId, status);
				orders.add(order);
				rentACarObject = new RentACarObject();
				vehicle = new Vehicle();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (Exception e) {
				}
			}
		}
	}
	
	public void toCSV() {
		String content = "";
		for (Order order : orders) {
			content += order.getOrderCode() + ';';
			content += Integer.toString(order.getVehicle().getId()) + ';';
			content += Integer.toString(order.getRentACarObject().getId()) + ';';
			content += order.getOrderDateTime().toString() + ';';
			content += Integer.toString(order.getDurationDays()) + ';';
			content += Double.toString(order.getPrice()) + ';';
			content += order.getCustomerName() + ';';
			content += Integer.toString(order.getCustomerId()) + ';';
			content += order.getStatus().toString() + ';';
		}

		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(path));
			writer.write(content);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
