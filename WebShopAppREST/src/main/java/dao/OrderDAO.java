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
				if (order.getVehicle().getId() == vehicle.getId()) {
					order.setVehicle(vehicle);
					break;
				}
			}
		}
	}
	
	public Collection<Order> getAll() {
		return orders;
	}
	
	public Collection<Order> getByRentACarObjectId(int id) {
		Collection<Order> ordersByRentACarObject = new ArrayList<Order>();
		for (Order order : orders) {
			if (order.getRentACarObject().getId() == id) {
				ordersByRentACarObject.add(order);
			}
		}
		return ordersByRentACarObject;
	}
	
	public Order getByCode(String code) {
		for (Order order : orders) {
			if (code.equals(order.getOrderCode())) {
				return order;
			}
		}
		return null;
	}
	
	public Order save(Order order) {
		order.setOrderCode(generateOrderCode());
		orders.add(order);
		toCSV();
		return order;
	}
	
	private String generateOrderCode() {
		AlphaNumericCodeGenerator generator = new AlphaNumericCodeGenerator();
		String code;
		boolean unique = true;
		do {
			code = generator.generate(10);
			for(Order order : orders) {
				if(code.equals(order.getOrderCode())) {
					unique = false;
				}
			}
		} while(!unique);
		return code;
	}
	
	public Collection<Order> getByVehicle(Vehicle vehicle) {
		return getByVehicleId(vehicle.getId());
	}
	
	public Collection<Order> getByVehicleId(int vehicleId) {
		Collection<Order> filtered = new ArrayList<>();
		for (Order order : orders) {
			if (order.getVehicle().getId() == vehicleId) {
				filtered.add(order);
			}
		}
		return filtered;
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
			String customerName = null, rejectionExplanation = null;
			int customerId = 0;
			OrderStatus status = OrderStatus.PROCESSING;
			boolean isRated = false;

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
					rejectionExplanation = st.nextToken();
					isRated = Boolean.parseBoolean(st.nextToken().trim());
				}
				
				Order order = new Order(orderCode, vehicle, rentACarObject, orderDateTime, duration, price, customerName, customerId, status, rejectionExplanation, isRated);
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
			content += order.getRejectionExplanation() + ';';
			content += Boolean.toString(order.isRated()) + '\n';
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
