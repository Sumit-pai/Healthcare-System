package com.healthcaresystem.healthcaresystem.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.healthcaresystem.healthcaresystem.exceptions.InvalidPatientException;
import com.healthcaresystem.healthcaresystem.exceptions.UserNotFoundException;
//import com.healthcaresystem.healthcaresystem.model.Employee;
import com.healthcaresystem.healthcaresystem.model.PatientRegistration;
import com.healthcaresystem.healthcaresystem.model.User;
import com.healthcaresystem.healthcaresystem.repository.UserRepository;
import com.healthcaresystem.healthcaresystem.service.UserService;

@CrossOrigin("*")
@RestController
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@PostMapping("/user")
	public ResponseEntity<User> addUser( @Valid @RequestBody User user) {
		System.out.println("*****");
		System.out.println(user);
		User user1 = userService.addUser(user);
		
		if(user1!=null) {
			logger.info("user successfully registered");
			return new ResponseEntity<>(user1,HttpStatus.OK);
		}
		
		logger.trace("add user method accessed");
		throw new UserNotFoundException("User details can not be null");
	}
	
	@DeleteMapping("/user/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable int id) {
		
		User user1 = userService.removeUser(id);
		
		if(user1!=null) {
			logger.info("User successfully removed");
			return new ResponseEntity<>(user1,HttpStatus.OK);
		}
		
		logger.trace("delete user method accessed");
		throw new UserNotFoundException("Invalid user id");
	}
	
	@GetMapping("/user")
	public List<User> findUser(){
		return userRepository.findAll();
		
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<User> getUser(@PathVariable int id) {
		
		User user = userService.getUser(id);
		
		if(user==null) {
			logger.info("User information fetched successfully");
			throw new UserNotFoundException("Invalid user id");
		}
		
		logger.trace("get user method accessed");
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	
	@PutMapping("/user/{id}")
	public ResponseEntity<User> updateUser(@PathVariable int id,@RequestBody User user) {
		User user1 = userService.updateUser(id, user);
		
		if(user1 == null) {
			throw new UserNotFoundException("Invalid user id");
		}
		else {
			return new ResponseEntity<>(user1,HttpStatus.OK);
		}
	}
	
	@PatchMapping("/user/{id}")
	public ResponseEntity<User> approve(@PathVariable int id,@RequestBody User user) {
		User user1 = userService.approve(id,user);
		if(user1 == null) {
			throw new UserNotFoundException("Invalid user id");
		}
		else {
			return new ResponseEntity<>(user1,HttpStatus.OK);
		}
	}
	
}