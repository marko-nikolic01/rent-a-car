package utilities;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;

import beans.User;
import dao.UserDAO;

public class Test {

	public static void main(String[] args) throws FileNotFoundException, IOException {
		UserDAO dao = new UserDAO();
		
		User user1 = new User(1, "veljosimus", "123", "Veljko", "Nikolic", LocalDate.of(2001, 12, 21), Gender.MALE, Role.CUSTOMER, false);
		User user2 = new User(2, "marko", "1234", "Marko", "Nikolic", LocalDate.of(2001, 12, 21), Gender.MALE, Role.CUSTOMER, false);
		
		dao.save(user1);
		dao.save(user2);
		
		System.out.println(dao.getById(1).getUsername());
	}
}
