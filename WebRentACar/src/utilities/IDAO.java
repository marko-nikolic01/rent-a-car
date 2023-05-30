package utilities;

import java.util.List;

public interface IDAO<T> {
	public T save(T entity);
	public List<T> load();
	public List<T> getAll();
	public T getById(int id);
}
