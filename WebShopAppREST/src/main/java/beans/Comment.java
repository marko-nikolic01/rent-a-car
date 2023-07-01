package beans;

import utilities.CommentStatus;

public class Comment {
	int id;
	User user;
	RentACarObject rentACarObject;
	String text;
	double rating;
	CommentStatus status;
	
	public Comment() {
		id = -1;
		user = new User();
		rentACarObject = new RentACarObject();
		text = "";
		rating = 0;
		status = CommentStatus.PROCESSING;
	}

	public Comment(int id, User user, RentACarObject rentACarObject, String text, double rating, CommentStatus status) {
		super();
		this.id = id;
		this.user = user;
		this.rentACarObject = rentACarObject;
		this.text = text;
		this.rating = rating;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public RentACarObject getRentACarObject() {
		return rentACarObject;
	}

	public void setRentACarObject(RentACarObject rentACarObject) {
		this.rentACarObject = rentACarObject;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public CommentStatus getStatus() {
		return status;
	}

	public void setStatus(CommentStatus status) {
		this.status = status;
	}
}
