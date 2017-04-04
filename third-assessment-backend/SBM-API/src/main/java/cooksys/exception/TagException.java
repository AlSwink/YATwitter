package cooksys.exception;

public class TagException extends Exception{
	private static final long serialVersionUID = 1L;
	private String errorMessage;
	
	public String getErrorMessage() {
		return errorMessage;
	}
	public TagException(String errorMessage) {
		super(errorMessage);
		this.errorMessage = errorMessage;
	}
	public TagException() {
		super();
	}

}
