package utilities;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.HashMap;

public class JSONSerializer {
	public void serialize(HashMap<String, String> keyValuePairs, String filename) {
		String json = getJSON(keyValuePairs);
		
		try {
			File jsonFile = new File(filename);
			BufferedWriter jsonWriter = new BufferedWriter(new FileWriter(jsonFile));
			jsonWriter.write(json);
			jsonWriter.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private String getJSON(HashMap<String, String> keyValuePairs) {
		String json = "{";
		for (String key : keyValuePairs.keySet()) {
			json += '"' + key + "\":" + '"' + keyValuePairs.get(key) + "\",";
		}
		json = json.substring(0, json.length() - 1);
		json += "}";
		return json;
	}
}
