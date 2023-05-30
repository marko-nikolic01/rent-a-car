package beans;



import java.time.LocalDate;
import java.util.Date;

import utilities.Gender;
import utilities.Role;

public class User {
	private int id;
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private LocalDate birthday;
	private Gender gender;
	private Role role;
	private boolean isDeleted;
	
	public User() {
		super();
	}

	public User(int id, String username, String password, String firstName, String lastName, LocalDate birthday,
			Gender gender, Role role, boolean isDeleted) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthday = birthday;
		this.gender = gender;
		this.role = role;
		this.isDeleted = isDeleted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LocalDate getBirthday() {
		return birthday;
	}

	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public boolean isValid() {
		if (username.isEmpty()
				|| password.isEmpty()
				|| firstName.isEmpty()
				|| lastName.isEmpty()
				|| birthday == null
				|| role == null) {
			return false;
		}
		
		return true;
	}
}
