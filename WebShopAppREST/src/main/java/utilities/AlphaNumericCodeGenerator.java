package utilities;

import java.util.concurrent.ThreadLocalRandom;

public class AlphaNumericCodeGenerator {
	public char[] characters;
	
	public AlphaNumericCodeGenerator() {
		String upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String lowerCase = "abcdefghijklmnopqrstuvwxyz";
		String digits = "0123456789";
		characters = (upperCase + lowerCase + digits).toCharArray();
	}
	
	public String generate(int length) {
		String code = "";
		for(int i = 0; i < length; i = i + 1) {
			int randomNumber = ThreadLocalRandom.current().nextInt(0, characters.length);
			code += characters[randomNumber];
		}
		return code;
	}
}
