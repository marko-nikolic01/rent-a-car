package utilities;

public interface ISerializable {
	public String[] toCSV();
	public void fromCSV(String[] values);
}
