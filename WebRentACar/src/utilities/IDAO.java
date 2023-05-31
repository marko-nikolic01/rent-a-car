package utilities;

import java.io.IOException;
import java.util.List;

public interface IDAO<T> {
	public T save(T entity) throws IOException;
	public List<T> load() throws IOException;
	public List<T> getAll();
	public T getById(int id);
	public int nextId();
}
