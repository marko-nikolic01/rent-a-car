package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.StringTokenizer;

import beans.Comment;
import beans.Order;
import beans.RentACarObject;
import beans.Vehicle;
import utilities.CommentStatus;
import utilities.OrderStatus;

public class CommentDAO {
	private String path = "comments.csv";
	private List<Comment> comments = new ArrayList<>();
	
	public CommentDAO() {}
	
	public CommentDAO(String contextPath) {
		path = contextPath + this.path;
		load();
	}
	
	public void linkOrders(Collection<Order> orders) {
		for (Comment comment : comments) {
			for (Order order : orders) {
				if (order.getOrderCode().equals(comment.getOrder().getOrderCode())) {
					comment.setOrder(order);
					break;
				}
			}
		}
	}
	
	public Collection<Comment> getAll() {
		return comments;
	}

	private void load() {
		BufferedReader reader = null;
		try {
			File file = new File(path);
			reader = new BufferedReader(new FileReader(file));

			String line;
			int id = -1;
			Order order = new Order();
			String text = "";
			double rating = 0;
			CommentStatus status = CommentStatus.PROCESSING;

			StringTokenizer st;
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0) {
					continue;
				}
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					id = Integer.parseInt(st.nextToken().trim());
					order.setOrderCode(st.nextToken().trim());
					text = st.nextToken().trim();
					rating = Double.parseDouble(st.nextToken().trim());
					status = CommentStatus.valueOf(st.nextToken().trim());
				}
				
				Comment comment = new Comment(id, order, text, rating, status);
				comments.add(comment);
				order = new Order();
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
		for (Comment comment : comments) {
			content += Integer.toString(comment.getId()) + ';';
			content += comment.getOrder().getOrderCode() + ';';
			content += comment.getText() + ';';
			content += Double.toString(comment.getRating()) + ';';
			content += comment.getStatus().toString() + '\n';
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
