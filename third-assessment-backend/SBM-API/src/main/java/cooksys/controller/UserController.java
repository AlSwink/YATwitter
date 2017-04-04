package cooksys.controller;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cooksys.RequestWrapper;
import cooksys.db.entity.embeddable.Credentials;
import cooksys.db.entity.embeddable.Profile;
import cooksys.dto.TweetDto;
import cooksys.dto.UserDto;
import cooksys.exception.ErrorResponse;
import cooksys.exception.UserException;
import cooksys.service.UserService;

@RestController
@Validated
@RequestMapping("users")
public class UserController {

	private UserService userService;
	
	public UserController(UserService userService){
		super();
		this.userService = userService;
	}
	
	@CrossOrigin
	@GetMapping
	public List<UserDto> index() {
		return userService.index();
	}
	@CrossOrigin
	@PostMapping
	public UserDto post(@RequestBody RequestWrapper wrapper, HttpServletResponse httpResponse){
		UserDto dto = userService.post(wrapper.getCredentials(), wrapper.getProfile());
		httpResponse.setStatus(HttpServletResponse.SC_CREATED);
		return dto;
	}
	
	@CrossOrigin
	@GetMapping("@{username}")
	public UserDto getUsername(@PathVariable String username) throws UserException{
		System.out.println(username);
		UserDto user = userService.get(username);
		if(user == null){
			throw new UserException("User does not exist");
		}
		return userService.get(username);
	}

	@CrossOrigin
	@PatchMapping("@{username}")
	public UserDto patchUser(@PathVariable String username, @RequestBody RequestWrapper wrapper, HttpServletResponse httpResponse){
		return userService.patch(username, wrapper.getCredentials(), wrapper.getProfile());
	}

	@CrossOrigin
	@DeleteMapping("@{username}")
	public UserDto deleteUser(@PathVariable String username, @RequestBody RequestWrapper wrapper, HttpServletResponse httpResponse){
		return userService.delete(username, wrapper.getCredentials());
	}
	
	@CrossOrigin
	@PostMapping("@{username}/follow")
	public void follow(@PathVariable String username, @RequestBody Credentials credentials, HttpServletResponse httpResponse){
		userService.follow(username, credentials);
	}
	
	@CrossOrigin
	@PostMapping("@{username}/unfollow")
	public void unfollow(@PathVariable String username, @RequestBody Credentials credentials, HttpServletResponse httpResponse){
		userService.unfollow(username, credentials);
	}
	
	@CrossOrigin
	@GetMapping("@{username}/feed")
	public List<TweetDto> getFeed(@PathVariable String username){
		return userService.feed(username);
	}
	
	@CrossOrigin
	@GetMapping("@{username}/tweets")
	public List<TweetDto> getTweets(@PathVariable String username){
		return userService.tweets(username);
	}
	
	@CrossOrigin
	@GetMapping("@{username}/mentions")
	public List<TweetDto> getMentions(@PathVariable String username){
		return userService.mentions(username);
	}
	
	@CrossOrigin
	@GetMapping("@{username}/followers")
	public Set<UserDto> getFollowers(@PathVariable String username){
		return userService.getFollowers(username);
	}
	
	@CrossOrigin
	@GetMapping("@{username}/following")
	public Set<UserDto> getFollowing(@PathVariable String username){
		return userService.getFollowing(username);
	}
	
	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorResponse> exceptionHandler(Exception ex) {
		ErrorResponse error = new ErrorResponse();
		error.setErrorCode(HttpStatus.NOT_FOUND.value());
		error.setMessage(ex.getMessage());
		return new ResponseEntity<ErrorResponse>(error, HttpStatus.OK);
	}
	
	
}
