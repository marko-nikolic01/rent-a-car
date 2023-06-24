package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.StringTokenizer;

import beans.Location;
import beans.RentACarObject;
import utilities.WorkingHours;

public class RentACarObjectDAO {
	private String filePath = "rentACarObjects.csv";
	private String path;
	private ArrayList<RentACarObject> rentACarObjects = new ArrayList<>();
	
	public RentACarObjectDAO() { }
	
	public RentACarObjectDAO(String contextPath) {
		path = contextPath + filePath;
		load(path);
	}
	
	public Collection<RentACarObject> getAll() {
		return rentACarObjects;
	}
	
	public Collection<RentACarObject> getWorking() {
		Collection<RentACarObject> workingObjects = new ArrayList<RentACarObject>();
		
		for (RentACarObject rentACarObject : rentACarObjects) {
			if (rentACarObject.isWorking()) {
				workingObjects.add(rentACarObject);
			}
		}
		
		return workingObjects;
	}
	
	public RentACarObject save(RentACarObject rentACarObject) {
		rentACarObject.setId(nextId());
		rentACarObjects.add(rentACarObject);
		toCSV();
		return rentACarObject;
	}

	private int nextId() {
		if (rentACarObjects.size() < 1) {
			return 1;
		}
		return rentACarObjects.stream().mapToInt(c -> c.getId()).max().getAsInt() + 1;
	}

	public void toCSV() {
		String content = "";
		for (RentACarObject object : rentACarObjects) {
			content += Integer.toString(object.getId()) + ';';
			content += object.getName() + ';';
			content += object.getWorkingHours().toString() + ';';
			content += Boolean.toString(object.isWorking()) + ';';
			content += object.getLocation().toString() + ';';
			content += object.getLogoURL() + ';';
			content += Double.toString(object.getRating()) + ';';
			content += "\n";
		}

		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(path));
			writer.write(content);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private void load(String filePath) {
		BufferedReader reader = null;
		try {
			File file = new File(filePath);
			reader = new BufferedReader(new FileReader(file));

			String line;
			int id = 0;
			String name = null;
			WorkingHours workingHours = null;
			boolean isWorking = false;
			Location location = new Location();
			String logoURL = null;
			double rating = 0;

			StringTokenizer st;
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0) {
					continue;
				}
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					id = Integer.parseInt(st.nextToken().trim());
					name = st.nextToken().trim();
					workingHours = WorkingHours.parseWorkingHours(st.nextToken().trim());
					isWorking = Boolean.parseBoolean(st.nextToken().trim());
					location = Location.parseLocation(st.nextToken().trim());
					logoURL = st.nextToken().trim();
					rating = Double.parseDouble(st.nextToken().trim());
				}

				rentACarObjects.add(new RentACarObject(id, name, workingHours, isWorking, location, logoURL, rating));
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
}
