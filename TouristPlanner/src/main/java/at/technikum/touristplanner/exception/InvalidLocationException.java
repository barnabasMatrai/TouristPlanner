package at.technikum.touristplanner.exception;

public class InvalidLocationException extends RuntimeException {
    public InvalidLocationException(String message) {
        super("Invalid location " + message);
    }
}
