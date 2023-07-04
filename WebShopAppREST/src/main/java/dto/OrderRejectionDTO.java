package dto;

public class OrderRejectionDTO {
	private String orderCode;
	private String explanation;
	
	public OrderRejectionDTO() {}

	public OrderRejectionDTO(String orderCode, String explanation) {
		super();
		this.orderCode = orderCode;
		this.explanation = explanation;
	}

	public String getOrderCode() {
		return orderCode;
	}

	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

	public String getExplanation() {
		return explanation;
	}

	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}
}
