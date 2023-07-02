package beans;

public class CustomerType {
	private String name;
	private double discount;
	private double pointsNeeded;
	
	public CustomerType(String name, double discount, double pointsNeeded) {
		super();
		this.name = name;
		this.discount = discount;
		this.pointsNeeded = pointsNeeded;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public double getPointsNeeded() {
		return pointsNeeded;
	}

	public void setPointsNeeded(double pointsNeeded) {
		this.pointsNeeded = pointsNeeded;
	}
}
