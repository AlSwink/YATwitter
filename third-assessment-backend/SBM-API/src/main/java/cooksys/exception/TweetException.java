package cooksys.exception;

public class TweetException extends Exception{
	private static final long serialVersionUID = 1L;
	private String errorMessage;
	
	public String getErrorMessage() {
		return errorMessage;
	}
	public TweetException(String errorMessage) {
		super(errorMessage);
		this.errorMessage = errorMessage;
	}
	public TweetException() {
		super();
	}

}
