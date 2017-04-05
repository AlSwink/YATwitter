package cooksys.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cooksys.dto.HashtagDto;
import cooksys.dto.TweetDto;
import cooksys.exception.ErrorResponse;
import cooksys.exception.TagException;
import cooksys.service.TagService;
//controller for the tag class
@RestController
@RequestMapping("tags")
public class TagController {
	
	private TagService tagService;
	
	public TagController(TagService tagService){
		super();
		this.tagService = tagService;
	}
	
	@CrossOrigin
	@GetMapping
	public List<HashtagDto> get(){
		return tagService.index();
	}
	
	@CrossOrigin
	@GetMapping("{label}")
	public List<TweetDto> getTag(@PathVariable String label){
		return tagService.taggedTweets(label);
	}
	
	@ExceptionHandler(TagException.class)
	public ResponseEntity<ErrorResponse> exceptionHandler(Exception ex) {
		ErrorResponse error = new ErrorResponse();
		error.setErrorCode(HttpStatus.PRECONDITION_FAILED.value());
		error.setMessage(ex.getMessage());
		return new ResponseEntity<ErrorResponse>(error, HttpStatus.OK);
	}

}
