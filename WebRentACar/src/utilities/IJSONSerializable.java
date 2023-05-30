package utilities;

import java.util.HashMap;

public interface IJSONSerializable<T> {
	public HashMap<String, String> toJSON(T entity);
}
