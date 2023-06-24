package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.StringTokenizer;

import beans.RentACarObject;
import beans.User;
import beans.Vehicle;
import utilities.Fuel;
import utilities.Gender;
import utilities.RentalStatus;
import utilities.Role;
import utilities.Transmission;
import utilities.VehicleType;

public class VehicleDAO {
	private String path = "vehicles.csv";
	private ArrayList<Vehicle> vehicles = new ArrayList<>();
	
	public VehicleDAO(String contextPath) {
		path = contextPath + "vehicles.csv";
		load();
	}
	
	public void linkRentACarObjects(Collection<RentACarObject> objects) {
		for (Vehicle vehicle : vehicles) {
			for (RentACarObject rentACarObject : objects) {
				if (vehicle.getRentACarObjectId() == rentACarObject.getId()) {
					vehicle.setRentACarObjectId(rentACarObject.getId());
					break;
				}
			}
		}
	}
	
	public Collection<Vehicle> getAll() {
		return vehicles;
	}
	
	public Vehicle save(Vehicle vehicle) {
		vehicle.setId(nextId());
		vehicles.add(vehicle);
		toCSV();
		return vehicle;
	}
	
	private int nextId() {
		if (vehicles.size() < 1) {
			return 1;
		}
		return vehicles.stream().mapToInt(c -> c.getId()).max().getAsInt() + 1;
	}
	
	public Vehicle getById(int id) {
		for (Vehicle vehicle : vehicles) {
			if (vehicle.getId() == id && !vehicle.isDeleted()) {
				return vehicle;
			}
		}
		return null;
	}
	
	public Collection<Vehicle> getByObjectId(int id) {
		Collection<Vehicle> vehiclesByObject = new ArrayList<>();
		for (Vehicle vehicle : vehicles) {
			if (vehicle.getRentACarObjectId() == id && !vehicle.isDeleted()) {
				vehiclesByObject.add(vehicle);
			}
		}
		return vehiclesByObject;
	}
	
	private void load() {
		BufferedReader reader = null;
		try {
			File file = new File(path);
			reader = new BufferedReader(new FileReader(file));

			String line;
			int id = 0, doors = 0, numberOfPassengers = 0;
			double price = 0, fuelConsumption = 0;
			String brand = null, model = null, description = null, photoURL = null;
			VehicleType type = null;
			Transmission transmission = null;
			Fuel fuel = null;
			RentalStatus status = null;
			int rentACarObjectId =  0;
			boolean isDeleted = false;

			StringTokenizer st;
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0) {
					continue;
				}
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					id = Integer.parseInt(st.nextToken().trim());
					brand = st.nextToken().trim();
					model = st.nextToken().trim();
					price = Double.parseDouble(st.nextToken().trim());
					type = VehicleType.valueOf(st.nextToken().trim());
					transmission = Transmission.valueOf(st.nextToken().trim());
					fuel = Fuel.valueOf(st.nextToken().trim());
					fuelConsumption = Double.parseDouble(st.nextToken().trim());
					doors = Integer.parseInt(st.nextToken().trim());
					numberOfPassengers = Integer.parseInt(st.nextToken().trim());
					description = st.nextToken().trim();
					photoURL = st.nextToken().trim();
					status = RentalStatus.valueOf(st.nextToken().trim());
					rentACarObjectId = Integer.parseInt(st.nextToken());
					isDeleted = Boolean.parseBoolean(st.nextToken().trim());
				}

				vehicles.add(new Vehicle(id, brand, model, price, type, transmission, fuel, fuelConsumption, doors,
						numberOfPassengers, description, photoURL, status, rentACarObjectId, isDeleted));
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
		for (Vehicle vehicle : vehicles) {
			content += Integer.toString(vehicle.getId()) + ';';
			content += vehicle.getBrand() + ';';
			content += vehicle.getModel() + ';';
			content += Double.toString(vehicle.getPrice()) + ';';
			content += vehicle.getType().toString() + ';';
			content += vehicle.getTransmission().toString() + ';';
			content += vehicle.getFuel().toString() + ';';
			content += Double.toString(vehicle.getFuelConsumption()) + ';';
			content += Integer.toString(vehicle.getDoors()) + ';';
			content += Integer.toString(vehicle.getNumberOfPassengers()) + ';';
			content += vehicle.getDescription() + ';';
			content += vehicle.getPhotoURL() + ';';
			content += vehicle.getStatus().toString() + ';';
			content += Integer.toString(vehicle.getRentACarObjectId()) + ';';
			content += Boolean.toString(vehicle.isDeleted()) + '\n';
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
