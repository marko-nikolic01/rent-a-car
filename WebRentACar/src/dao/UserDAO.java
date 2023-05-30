package dao;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import beans.User;
import utilities.Gender;
import utilities.IDAO;
import utilities.IJSONSerializable;
import utilities.JSONSerializer;
import utilities.Role;

public class UserDAO implements IDAO<User>, IJSONSerializable<User> {
	
	private List<User> users = new ArrayList<>();
	private JSONSerializer serializer = new JSONSerializer();

	public UserDAO() {
		users = load();
	}
	
	@Override
	public User save(User entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashMap<String, String> toJSON(User entity) {
		HashMap<String, String> keyValuePairs = new HashMap<>();
		keyValuePairs.put("id", Integer.toString(entity.getId()));
		keyValuePairs.put("username", entity.getUsername());
		keyValuePairs.put("password", entity.getPassword());
		keyValuePairs.put("firstName", entity.getFirstName());
		keyValuePairs.put("lastName", entity.getLastName());
		keyValuePairs.put("birthday", entity.getBirthday().toString());
		keyValuePairs.put("gender", entity.getGender().toString());
		keyValuePairs.put("role", entity.getRole().toString());
		return keyValuePairs;
	}

	@Override
	public List<User> load() {
		List<User> newUsers = new ArrayList<>();
		newUsers.add(new User(1, "veljosimus", "123", "Veljko", "Nikolic", LocalDate.of(2001, 12, 21), Gender.MALE, Role.CUSTOMER, false));
		newUsers.add(new User(1, "marko", "1234", "Marko", "Nikolic", LocalDate.of(2001, 12, 21), Gender.MALE, Role.CUSTOMER, false));
		return newUsers;
	}

	@Override
	public List<User> getAll() {
		return users;
	}

	@Override
	public User getById(int id) {
		for (User user : users) {
			if (user.getId() == id) return user;
		}
		return null;
	}
}
