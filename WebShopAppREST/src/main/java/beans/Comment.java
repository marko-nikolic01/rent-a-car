package beans;

import utilities.CommentStatus;

public class Comment {
	int id;
	Order order;
	String text;
	double rating;
	CommentStatus status;
	
	public Comment() {
		id = -1;
		order = new Order();
		text = "";
		rating = 0;
		status = CommentStatus.PROCESSING;
	}

	public Comment(int id, Order order, String text, double rating, CommentStatus status) {
		super();
		this.id = id;
		this.order = order;
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

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
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
