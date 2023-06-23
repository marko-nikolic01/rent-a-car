package dto;

import beans.RentACarObject;

public class RentACarObjectWithManagerDTO {
	private RentACarObject rentACarObject;
	private int managerId;
	
	public RentACarObjectWithManagerDTO() {}
	
	public RentACarObjectWithManagerDTO(RentACarObject rentACarObject, int managerId) {
		super();
		this.rentACarObject = rentACarObject;
		this.managerId = managerId;
	}
	
	public RentACarObject getRentACarObject() {
		return rentACarObject;
	}
	
	public void setRentACarObject(RentACarObject rentACarObject) {
		this.rentACarObject = rentACarObject;
	}
	
	public int getManagerId() {
		return managerId;
	}
	
	public void setManagerId(int managerId) {
		this.managerId = managerId;
	}
}
