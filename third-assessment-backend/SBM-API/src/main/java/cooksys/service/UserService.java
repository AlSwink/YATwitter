package cooksys.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Service;

import cooksys.TweetByTimeComparator;
import cooksys.db.entity.Tweet;
import cooksys.db.entity.User;
import cooksys.db.entity.embeddable.Credentials;
import cooksys.db.entity.embeddable.Profile;
import cooksys.db.repository.TweetRepository;
import cooksys.db.repository.UserRepository;
import cooksys.dto.TweetDto;
import cooksys.dto.UserDto;
import cooksys.mapper.TweetMapper;
import cooksys.mapper.UserMapper;

@Service
public class UserService {

	UserRepository userRepository;
	UserMapper userMapper;
	TweetMapper tweetMapper;
	TweetRepository tweetRepository;
	EntityManager entityManager;

	public UserService(UserRepository userRepo, UserMapper userMap, TweetMapper tweetMapper,
			TweetRepository tweetRepository, EntityManager entityManager) {
		super();
		this.userMapper = userMap;
		this.userRepository = userRepo;
		this.tweetMapper = tweetMapper;
		this.tweetRepository = tweetRepository;
		this.entityManager = entityManager;
	}

	// searches database for all users that have not been deleted using derived query defined in UserRepository
	public List<UserDto> index() {
		return userRepository.findByDeletedFalse().stream().map(userMapper::toUserDto).collect(Collectors.toList());
	}

	public UserDto post(Credentials credentials, Profile profile) {
		
		User u = userRepository.findByCredentialsUsername(credentials.getUsername());
		//if user is new, creates and saves it to database
		if (u == null) {
			u = new User();
			u.setUname(credentials.getUsername());
			u.setCredentials(credentials);
			u.setProfile(profile);
			userRepository.save(u);
			entityManager.detach(u);
			u = userRepository.findByUname(credentials.getUsername());
		
		}  //or if user has been previously deleted, reactivates it
		else if (u.isDeleted() == true) {
			u.setDeleted(false);
			userRepository.save(u);
			
		}
		return userMapper.toUserDto(u);
	}

	public UserDto get(String username) {
		return userMapper.toUserDto(userRepository.findByUname(username));
	}

	// deletes user, then runs through all user's tweets sets them to deleted
	public UserDto delete(String username) {
		
			User deleted = userRepository.findByUname(username);
			if (credentialCheck(username, deleted.getCredentials())) {
			deleted.setDeleted(true);
			for (Tweet t : deleted.getTweets()) {
				t.setDeleted(true);

			}
			tweetRepository.save(deleted.getTweets());
			userRepository.save(deleted);
			return userMapper.toUserDto(deleted);
		} else
			return null;
	}

	// adds follower and followee relationship
	public void follow(String username, Credentials credentials) {
		if (credentialCheck(credentials.getUsername(), credentials)) {
			User follower = userRepository.findByCredentialsUsername(credentials.getUsername());
			User followee = userRepository.findByUname(username);
			follower.getFollowing().add(followee);
			followee.getFollowers().add(follower);
			userRepository.save(follower);
			userRepository.save(followee);
		}
	}

	// gets rid of relationship made in previous 
	public void unfollow(String username, Credentials credentials) {
		if (credentialCheck(credentials.getUsername(), credentials)) {
			User follower = userRepository.findByCredentialsUsername(credentials.getUsername());
			User followee = userRepository.findByUname(username);
			follower.getFollowing().remove(followee);
			followee.getFollowers().remove(follower);
			userRepository.save(follower);
			userRepository.save(followee);
		}
	}

	public UserDto patch(String username, Credentials credentials, Profile profile) {
		if (credentialCheck(username, credentials)) {
			User patched = userRepository.findByUname(username);
			patched.setProfile(profile);
			userRepository.save(patched);
			return userMapper.toUserDto(patched);
		}
		return null;
	}

	// working
	public Set<UserDto> getFollowers(String username) {
		User getting = userRepository.findByUname(username);
		Set<UserDto> dtoSet = new HashSet<>();
		for (User u : getting.getFollowers()) {
			dtoSet.add(userMapper.toUserDto(u));
		}
		return dtoSet;
	}

	// working
	public Set<UserDto> getFollowing(String username) {
		User getting = userRepository.findByUname(username);
		Set<UserDto> dtoSet = new HashSet<>();
		for (User u : getting.getFollowing()) {
			dtoSet.add(userMapper.toUserDto(u));
		}
		return dtoSet;
	}

	//check for types
	public List<TweetDto> feed(String username) {
		// fetches tweets by user
		List<TweetDto> self = new ArrayList<>();
		for (Tweet tweet : userRepository.findByUname(username).getTweets()) {
			if (tweet.isDeleted() == false){
				switch (tweet.getType()) {
				case "simple":
					self.add(tweetMapper.toSimpleDto(tweet));
					break;
				case "reply":
					self.add(tweetMapper.toReplyDto(tweet));
					break;
				case "repost":
					self.add(tweetMapper.toRepostDto(tweet));
					break;
				}
			}
		}
		//fetches tweets by people the user is following
		for (User u : userRepository.findByUname(username).getFollowing()) {
			for (Tweet tweet : u.getTweets()) {
				if (tweet.isDeleted() == false)
					if (tweet.isDeleted() == false){
						switch (tweet.getType()) {
						case "simple":
							self.add(tweetMapper.toSimpleDto(tweet));
							break;
						case "reply":
							self.add(tweetMapper.toReplyDto(tweet));
							break;
						case "repost":
							self.add(tweetMapper.toRepostDto(tweet));
							break;
						}
					}
			}
		}
		Collections.sort(self, new TweetByTimeComparator());
		Collections.reverse(self);
		return self;
	}

	public List<TweetDto> tweets(String username) {
		List<Tweet> convert = userRepository.findByUname(username).getTweets();

		List<TweetDto> dto = new ArrayList<>();
		for(Tweet check : convert){
			switch (check.getType()) {
			case "simple":
				dto.add(tweetMapper.toSimpleDto(check));
				break;
			case "reply":
				dto.add(tweetMapper.toReplyDto(check));
				break;
			case "repost":
				dto.add(tweetMapper.toRepostDto(check));
				break;
			}
		}
		Collections.sort(dto, new TweetByTimeComparator());
		Collections.reverse(dto);
		return dto;
	}

	public List<TweetDto> mentions(String username) {
		List<Tweet> convert = userRepository.findByUname(username).getMentioned();

		List<TweetDto> dto = new ArrayList<>();
		for(Tweet check : convert){
			switch (check.getType()) {
			case "simple":
				dto.add(tweetMapper.toSimpleDto(check));
				break;
			case "reply":
				dto.add(tweetMapper.toReplyDto(check));
				break;
			case "repost":
				dto.add(tweetMapper.toRepostDto(check));
				break;
			}
		}
		Collections.sort(dto,new TweetByTimeComparator());
		return dto;

	}

	//reusable method to check credentials against the user
	public boolean credentialCheck(String username, Credentials credentials) {
		if (userRepository.findByCredentialsUsername(username).getCredentials().equals(credentials))
			return true;
		else
			return false;
	}
}
