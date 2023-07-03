package beans;

import java.time.LocalDate;
import java.util.ArrayList;

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
	private RentACarObject rentACarObject;
	private ArrayList<Order> orders = new ArrayList<>();
	private double points;
	private CustomerType type;
	private Cart cart;
	private boolean isDeleted;

	public User() {
		super();
		id = -1;
		username = "";
		password = "";
		firstName = "";
		lastName = "";
		birthday = LocalDate.of(1999, 1, 1);
		gender = Gender.MALE;
		role = Role.CUSTOMER;
		rentACarObject = new RentACarObject();
		points = 0;
		type = new CustomerType("Normal", 0, 0);
		cart = new Cart(this);
		isDeleted = false;
	}

	public User(int id, String username, String password, String firstName, String lastName, LocalDate birthday,
			Gender gender, Role role, RentACarObject rentACarObject, double points, boolean isDeleted) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthday = birthday;
		this.gender = gender;
		this.role = role;
		this.rentACarObject = rentACarObject;
		this.points = points;
		setType();
		cart = new Cart(this);
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
	
	public RentACarObject getRentACarObject() {
		return rentACarObject;
	}
	
	public void setRentACarObject(RentACarObject rentACarObject) {
		this.rentACarObject = rentACarObject;
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

	public ArrayList<Order> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<Order> orders) {
		this.orders = orders;
	}

	public double getPoints() {
		return points;
	}

	public void setPoints(double points) {
		this.points = points;
		setType();
	}

	public CustomerType getType() {
		return type;
	}

	public void setType() {
		if(this.points >= 3000)
			this.type = new CustomerType("Gold", 10, 3000);
		else if(this.points >= 2000)
			this.type = new CustomerType("Silver", 5, 2000);
		else if(this.points >= 1000)
			this.type = new CustomerType("Bronze", 2, 1000);
		else
			this.type = new CustomerType("Normal", 0, 0);
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}
}
