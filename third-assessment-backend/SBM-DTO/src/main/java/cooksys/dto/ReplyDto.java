package cooksys.dto;

import java.sql.Timestamp;

public class ReplyDto extends TweetDto {

	private Integer id;
	
	private UserDto author;
	
	private Timestamp posted;
	
	private String content;
	
	private ReplyDto inReplyTo;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public UserDto getAuthor() {
		return author;
	}

	public void setAuthor(UserDto author) {
		this.author = author;
	}

	public Timestamp getPosted() {
		return posted;
	}

	public void setPosted(Timestamp posted) {
		this.posted = posted;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public ReplyDto getInReplyTo() {
		return inReplyTo;
	}

	public void setInReplyTo(ReplyDto inReplyTo) {
		this.inReplyTo = inReplyTo;
	}

}
