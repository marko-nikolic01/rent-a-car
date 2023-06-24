package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.Console;
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
import dto.SignInCredentialsDTO;
import utilities.Gender;
import utilities.Role;

public class UserDAO {
	private String path = "users.csv";
	private ArrayList<User> users = new ArrayList<>();
	private User signedInUser = null;

	public UserDAO() {

	}

	public UserDAO(String contextPath) {
		path = contextPath + "users.csv";
		load();
	}

	public Collection<User> getAll() {
		return users;
	}
	
	public User signInBySignInCredentials(SignInCredentialsDTO credentials) {
		return singInByUsernamePassword(credentials.getUsername(), credentials.getPassword());
	}
	
	public User singInByUsernamePassword(String username, String password) {
		for (User user : users) {
			if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
				signedInUser = user;
				return user;
			}
		}
		return null;
	}
	
	public void linkRentACarObjects(Collection<RentACarObject> objects) {
		for (User user : users) {
			for (RentACarObject rentACarObject : objects) {
				if (user.getRentACarObject().getId() == rentACarObject.getId()) {
					user.setRentACarObject(rentACarObject);
					break;
				}
			}
		}
	}
	
	public User getSignedInUser() {
		return signedInUser;
	}
	public User signUp(User user) {
		RentACarObject object = new RentACarObject();
		object.setId(-1);
		user.setRentACarObject(object);
		return save(user);
	}

	public User save(User user) {
		user.setId(nextId());
		users.add(user);
		toCSV();
		return user;
	}

	private int nextId() {
		if (users.size() < 1) {
			return 1;
		}
		return users.stream().mapToInt(c -> c.getId()).max().getAsInt() + 1;
	}
	
	public boolean userWithUsernameExists(String username) {
		User user = getByUsername(username);
		return userExists(user);
	}
	
	public boolean userExists(User user) {
		return users.contains(user);
	}
	
	public User getById(int id) {
		for (User user : users) {
			if (user.getId() == id) {
				return user;
			}
		}
		return null;
	}
	
	public User deleteByUsername(String username) {
		User user = getByUsername(username);		
		return delete(user);
	}
	
	public User delete(User user) {
		if (!userExists(user)) {
			return null;
		}
		users.remove(user);
		toCSV();
		return user;
	}
	
	public Collection<User> deleteAll() {
		users.clear();
		toCSV();
		return users;
	}
	
	public User getByUsername(String username) {
		for (User user : users) {
			if (user.getUsername().equals(username)) {
				return user;
			}
		}
		return null;
	}
	
	public Collection<User> getUnassignedManagers() {
		Collection<User> unassignedManagers = new ArrayList<>();
		
		for (User user : users) {
			if (user.getRole().equals(Role.MANAGER) && user.getRentACarObject().getId() == -1) {
				unassignedManagers.add(user);
			}
		}
		
		return unassignedManagers;
	}

	private void load() {
		BufferedReader reader = null;
		try {
			File file = new File(path);
			reader = new BufferedReader(new FileReader(file));

			String line;
			int id = 0;
			String username = null, password = null, firstName = null, lastName = null;
			LocalDate birthday = null;
			Gender gender = null;
			Role role = null;
			RentACarObject rentACarObject = new RentACarObject();
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
					username = st.nextToken().trim();
					password = st.nextToken().trim();
					firstName = st.nextToken().trim();
					lastName = st.nextToken().trim();
					birthday = LocalDate.parse(st.nextToken().trim());
					gender = Gender.valueOf(st.nextToken().trim());
					role = Role.valueOf(st.nextToken().trim());
					rentACarObject.setId(Integer.parseInt(st.nextToken()));
					isDeleted = Boolean.parseBoolean(st.nextToken().trim());
				}

				users.add(new User(id, username, password, firstName, lastName, birthday, gender, role, rentACarObject, isDeleted));
				rentACarObject = new RentACarObject();
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
		for (User user : users) {
			content += Integer.toString(user.getId()) + ';';
			content += user.getUsername() + ';';
			content += user.getPassword() + ';';
			content += user.getFirstName() + ';';
			content += user.getLastName() + ';';
			content += user.getBirthday().toString() + ';';
			content += user.getGender().toString() + ';';
			content += user.getRole().toString() + ';';
			content += Integer.toString(user.getRentACarObject().getId()) + ';';
			content += Boolean.toString(user.isDeleted()) + '\n';
		}

		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(path));
			writer.write(content);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public User update(User updatedUser) {
		User user = getById(updatedUser.getId());
		if (user != null) {
			users.remove(user);
			users.add(updatedUser);
			user = updatedUser;
			if (signedInUser != null) {
				if (user.getId() == signedInUser.getId()) {
					signedInUser = user;
				}
			}
			toCSV();
		}
		return user;
	}
}
