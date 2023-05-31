package dao;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import beans.User;
import repository_interfaces.IUserDAO;
import utilities.Serializer;

public class UserDAO implements IUserDAO  {
	
	private String filePath = "users.csv";
	private List<User> users = new ArrayList<>();
	private Serializer<User> serializer = new Serializer<>();

	public UserDAO() throws FileNotFoundException, IOException {
		users = load();
	}

	public List<User> load() throws IOException {
		List<String[]> csvValues = serializer.readCSVValues(filePath);
		
		List<User> newUsers = new ArrayList<>();
		
		for (String[] values : csvValues) {
			User newUser = new User();
			newUser.fromCSV(values);
			newUsers.add(newUser);
		}
		
		
//		newUsers.add(new User(1, "veljosimus", "123", "Veljko", "Nikolic", LocalDate.of(2001, 12, 21), Gender.MALE, Role.CUSTOMER, false));
//		newUsers.add(new User(2, "marko", "1234", "Marko", "Nikolic", LocalDate.of(2001, 12, 21), Gender.MALE, Role.CUSTOMER, false));
		
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

	@Override
	public int nextId() {
        if (users.size() < 1)
        {
            return 1;
        }
        return users.stream().mapToInt(c -> c.getId()).max().getAsInt() + 1;
	}

	@Override
	public User save(User entity) throws IOException {
		// TODO Auto-generated method stub
		entity.setId(nextId());
		users.add(entity);
		serializer.toCSV(filePath, users);
		return entity;
	}
}
