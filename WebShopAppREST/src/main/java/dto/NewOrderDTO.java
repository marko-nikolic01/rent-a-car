package dto;

import java.time.LocalDate;

public class NewOrderDTO {
	private int vehicleId;
	private LocalDate startDate;
	private LocalDate endDate;
	private int customerId;
	
	public NewOrderDTO() {
		
	}
	
	public NewOrderDTO(int vehicleId, LocalDate startDate, LocalDate endDate, int customerId) {
		super();
		this.vehicleId = vehicleId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.customerId = customerId;
	}
	
	public int getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
}
