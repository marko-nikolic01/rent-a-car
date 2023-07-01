package dto;

public class NewCommentDTO {
	private String orderCode;
	private String text;
	private double rating;
	
	public NewCommentDTO() {}
	
	public NewCommentDTO(String orderCode, String text, double rating) {
		super();
		this.orderCode = orderCode;
		this.text = text;
		this.rating = rating;
	}
	
	public String getOrderCode() {
		return orderCode;
	}
	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
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
}
