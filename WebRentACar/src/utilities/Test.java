package utilities;

import dao.UserDAO;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		UserDAO dao = new UserDAO();
		
		JSONSerializer serializer = new JSONSerializer();
		
		serializer.serialize(dao.toJSON(dao.getById(1)), "ovde.json");
	}
}
