package utilities;

import java.time.LocalTime;

public class WorkingHours {
	public LocalTime startTime;
	public LocalTime endTime;
	
	public WorkingHours() {
		startTime = LocalTime.of(12, 0);
		endTime = LocalTime.of(12, 0);
	}
	
	public WorkingHours(LocalTime startTime, LocalTime endTime) {
		super();
		this.startTime = startTime;
		this.endTime = endTime;
	}
	
	public WorkingHours(int startTimeHour, int startTimeMinute, int endTimeHour, int endTimeMinute) {
		super();
		this.startTime = LocalTime.of(startTimeHour, startTimeMinute);
		this.endTime = LocalTime.of(endTimeHour, endTimeMinute);
	}
	
	// checks if open
	public boolean isOpen() {
		LocalTime currentTime = LocalTime.now();
		return currentTime.isAfter(startTime) && currentTime.isBefore(endTime);
	}
	
	public static WorkingHours of(LocalTime startTime, LocalTime endTime) {
		return new WorkingHours(startTime, endTime);
	}
	
	public static WorkingHours of(int startTimeHour, int startTimeMinute, int endTimeHour, int endTimeMinute) {
		return new WorkingHours(startTimeHour, startTimeMinute, endTimeHour, endTimeMinute);
	}
	
	public static WorkingHours parseWorkingHours(String text) {		
		String[] tokens = text.split("-");
		
		LocalTime startTime = LocalTime.parse(tokens[0]);
		LocalTime endTime = LocalTime.parse(tokens[1]);
		
		return new WorkingHours(startTime, endTime);
	}

	@Override
	public String toString() {
		return startTime + "-" + endTime;
	}
}
