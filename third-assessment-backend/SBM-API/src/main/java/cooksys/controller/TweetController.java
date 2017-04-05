package cooksys.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cooksys.Context;
import cooksys.RequestWrapper;
import cooksys.db.entity.embeddable.Credentials;
import cooksys.dto.HashtagDto;
import cooksys.dto.ReplyDto;
import cooksys.dto.RepostDto;
import cooksys.dto.TweetDto;
import cooksys.dto.UserDto;
import cooksys.exception.ErrorResponse;
import cooksys.exception.TweetException;
import cooksys.service.TweetService;

@RestController
@RequestMapping("tweets")
public class TweetController {
	
	private TweetService tweetService;
	
	public TweetController(TweetService tweetService){
		super();
		this.tweetService = tweetService;
	}
	
	@CrossOrigin
	@GetMapping
	public List<TweetDto> index(){
		return tweetService.index();
	}
	
	@CrossOrigin
	@PostMapping
	public TweetDto post(@RequestBody RequestWrapper wrapper, HttpServletResponse httpResponse){
		TweetDto dto = tweetService.post(wrapper.getCredentials().getUsername(), wrapper.getContent());
		httpResponse.setStatus(HttpServletResponse.SC_CREATED);
		return dto;
	}
	
	@CrossOrigin
	@GetMapping("{id}")
	public TweetDto get(@PathVariable int id) throws TweetException{
		TweetDto tweet = tweetService.get(id);
		if(tweet == null){
			throw new TweetException("Tweet does not exist");
		}
		return tweetService.get(id);
	}
	
	@CrossOrigin
	@DeleteMapping("{id}")
	public TweetDto delete(@PathVariable int id, @RequestBody Credentials credentials){
		return tweetService.delete(id, credentials);
	}
	
	@CrossOrigin
	@PostMapping("{id}/like")
	public void like(@PathVariable int id, @RequestBody Credentials credentials){
		tweetService.like(id, credentials);
	}
	
	@CrossOrigin
	@PostMapping("{id}/reply")
	public ReplyDto reply(@PathVariable int id, @RequestBody RequestWrapper wrapper, HttpServletResponse httpResponse){
		ReplyDto dto = tweetService.reply(id, wrapper.getCredentials(), wrapper.getContent());
		httpResponse.setStatus(HttpServletResponse.SC_CREATED);
		return dto;
	}
	
	@CrossOrigin
	@PostMapping("{id}/repost")
	public RepostDto repost(@PathVariable int id, @RequestBody Credentials credentials, HttpServletResponse httpResponse){
		RepostDto dto = tweetService.repost(id, credentials);
		httpResponse.setStatus(HttpServletResponse.SC_CREATED);
		return dto;
	}
	
	@CrossOrigin
	@GetMapping("{id}/tags")
	public List<HashtagDto> tags(@PathVariable int id){
		return tweetService.getTags(id);
	}
	
	@CrossOrigin
	@GetMapping("{id}/likes")
	public List<UserDto> getLikes(@PathVariable int id){
		return tweetService.getLikes(id);
	}
	
	@CrossOrigin
	@GetMapping("{id}/context")
	public Context getContext(@PathVariable int id){
		return tweetService.context(id);
	}
	
	@CrossOrigin
	@GetMapping("{id}/replies")
	public List<ReplyDto> getReplies(@PathVariable int id){
		return tweetService.getReplies(id);
	}
	
	@CrossOrigin
	@GetMapping("{id}/reposts")
	public List<RepostDto> getReposts(@PathVariable int id){
		return tweetService.getReposts(id);
	}
	
	@CrossOrigin
	@GetMapping("{id}/mentions")
	public List<UserDto> getMentions(@PathVariable int id){
		return tweetService.mentions(id);
	}
	
	//maybe add trending functionality
	
	@ExceptionHandler(TweetException.class)
	public ResponseEntity<ErrorResponse> exceptionHandler(Exception ex) {
		ErrorResponse error = new ErrorResponse();
		error.setErrorCode(HttpStatus.NOT_FOUND.value());
		error.setMessage(ex.getMessage());
		return new ResponseEntity<ErrorResponse>(error, HttpStatus.OK);
	}
	
}
