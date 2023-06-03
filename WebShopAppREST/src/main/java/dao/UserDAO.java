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
	
	public User getSignedInUser() {
		return signedInUser;
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
	
	public boolean userExists(String username) {
		for(User user : users) {
			if(user.getUsername().equals(username)) {
				return true;
			}
		}
		return false;
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
					isDeleted = Boolean.parseBoolean(st.nextToken().trim());
				}

				users.add(new User(id, username, password, firstName, lastName, birthday, gender, role, isDeleted));
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
//		File oldFile = new File(path);
//		oldFile.delete();
//		File newFile = new File(path);

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
}
