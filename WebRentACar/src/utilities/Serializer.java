package utilities;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Serializer<T extends ISerializable>  {
	private String Delimiter = "\t";

    public void toCSV(String fileName, List<T> objects) throws IOException
    {
        StringBuilder csv = new StringBuilder();

        for (T obj : objects)
        {
            String line = String.join(Delimiter, obj.toCSV());
            csv.append(line + '\n');
        }
        
        try {
			File file = new File(fileName);
			
			if (file.exists()) {
				file.delete();
			}
			
			file.createNewFile();
			
			try (FileWriter writer = new FileWriter(fileName)) {
	            writer.write(csv.toString());
	        }
	        catch (IOException e) {
	        	e.printStackTrace();
			}	
		} catch (IOException e) {
			e.printStackTrace();
		}
    }
    
    public List<String[]> readCSVValues(String filename) throws IOException {
    	List<String[]> listOfObjectValues = new ArrayList<String[]>();
    	
    	try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
    		String line;
    		while ((line = reader.readLine()) != null) {
                String[] values = line.split(Delimiter);
                listOfObjectValues.add(values);
    		}
    	}
    	catch (FileNotFoundException e) {
    		File file = new File(filename);
    		file.createNewFile();
		}
    	catch (Exception e) {
    		e.printStackTrace();
		}
    	
    	return listOfObjectValues;
    }
}
