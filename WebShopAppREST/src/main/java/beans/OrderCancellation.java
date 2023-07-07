package beans;

import java.time.LocalDate;

public class OrderCancellation {
	private int id;
	private int userId;
	private String orderCode;
	private LocalDate date;

	OrderCancellation() {
		id = -1;
		userId = -1;
		orderCode = "";
		date = LocalDate.now();
	}

	public OrderCancellation(User user, Order order) {
		super();
		this.id = -1;
		this.userId = user.getId();
		this.orderCode = order.getOrderCode();
		this.date = LocalDate.now();
	}

	public OrderCancellation(int id, int userId, String orderCode, LocalDate date) {
		super();
		this.id = id;
		this.userId = userId;
		this.orderCode = orderCode;
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getOrderCode() {
		return orderCode;
	}

	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}
}
