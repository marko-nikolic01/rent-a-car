package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.StringTokenizer;

import beans.OrderCancellation;
import beans.RentACarObject;
import beans.User;
import utilities.Gender;
import utilities.Role;

public class OrderCancellationDAO {
	private String path = "orderCancellations.csv";
	private ArrayList<OrderCancellation> cancellations = new ArrayList<>();

	public OrderCancellationDAO() {}

	public OrderCancellationDAO(String contextPath) {
		path = contextPath + "orderCancellations.csv";
		load();
	}
	
	public Collection<OrderCancellation> getAll() {
		return cancellations;
	}
	
	public Collection<OrderCancellation> getByUserLastMonth(User user) {
		Collection<OrderCancellation> cancellationsByUserLastMonth = new ArrayList<OrderCancellation>();
		for(OrderCancellation cancellation : cancellations) {
			if(user.getId() == cancellation.getUserId() && isWithinLastMonth(cancellation)) {
				cancellationsByUserLastMonth.add(cancellation);
			}
		}
		return cancellationsByUserLastMonth;
	}
	
	private boolean isWithinLastMonth(OrderCancellation cancellation) {
		if(cancellation.getDate().isAfter(LocalDate.now().minusMonths(1)))
			return true;
		return false;
	}
	
	public OrderCancellation save(OrderCancellation cancellation) {
		cancellation.setId(nextId());
		cancellations.add(cancellation);
		toCSV();
		return cancellation;
	}
	
	private int nextId() {
		if (cancellations.size() < 1) {
			return 1;
		}
		return cancellations.stream().mapToInt(c -> c.getId()).max().getAsInt() + 1;
	}
	
	private void load() {
		BufferedReader reader = null;
		try {
			File file = new File(path);
			reader = new BufferedReader(new FileReader(file));

			String line;
			int id = 0, userId = 0;
			String orderCode = null;
			LocalDate date = null;

			StringTokenizer st;
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0) {
					continue;
				}
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					id = Integer.parseInt(st.nextToken().trim());
					userId = Integer.parseInt(st.nextToken().trim());
					orderCode = st.nextToken().trim();
					date = LocalDate.parse(st.nextToken().trim());
				}

				cancellations.add(new OrderCancellation(id, userId, orderCode, date));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (Exception e) {
				}
			}
		}
	}
	
	public void toCSV() {
		String content = "";
		for (OrderCancellation cancellation : cancellations) {
			content += Integer.toString(cancellation.getId()) + ';';
			content += Integer.toString(cancellation.getUserId()) + ';';
			content += cancellation.getOrderCode() + ';';
			content += cancellation.getDate().toString() + '\n';
		}

		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(path));
			writer.write(content);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
