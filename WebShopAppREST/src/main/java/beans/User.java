package beans;

import java.time.LocalDate;

import utilities.Gender;
import utilities.ISerializable;
import utilities.Role;

public class User implements ISerializable {
	private int id;
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private LocalDate birthday;
	private Gender gender;
	private Role role;
	private boolean isDeleted;
	
	private RentACarObject rentACarObject;

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
		if (username.isEmpty() || password.isEmpty() || firstName.isEmpty() || lastName.isEmpty() || birthday == null
				|| birthday.isAfter(LocalDate.now()) || role == null) {
			return false;
		}

		return true;
	}

	@Override
	public String[] toCSV() {
		String[] values = { Integer.toString(id), username, password, firstName, lastName, birthday.toString(),
				gender.toString(), role.toString(), Boolean.toString(isDeleted) };

		return values;
	}

	@Override
	public void fromCSV(String[] values) {
		id = Integer.parseInt(values[0]);
		username = values[1];
		password = values[2];
		firstName = values[3];
		lastName = values[4];
		birthday = LocalDate.parse(values[5]);
		gender = Gender.valueOf(values[6]);
		role = Role.valueOf(values[7]);
	}
}
