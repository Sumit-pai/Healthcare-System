package com.healthcaresystem.healthcaresystem.controller;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.healthcaresystem.healthcaresystem.exceptions.UserNotFoundException;
import com.healthcaresystem.healthcaresystem.model.Login;
import com.healthcaresystem.healthcaresystem.service.LoginService;


class Message{
	String text;
	String role;
	int userId;
	Boolean auth;
	int roleId;
	
	
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Boolean getAuth() {
		return auth;
	}
	public void setAuth(Boolean auth) {
		this.auth = auth;
	}
	
	
}

@RestController
@CrossOrigin("*")
public class LoginController {
	
private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	   
	
	@Autowired
	LoginService service;
	
	@PostMapping("/login")
	public ResponseEntity<Message> login(@Valid @RequestBody Login login) {
		System.out.println("Admin");
		Login login1=service.signIn(login);
		System.out.println("Admin");
		System.out.println(login1);
		Message msg=new Message();
		if(login1 != null) {
			logger.info("succesfully signed in!!");
			System.out.println(login1.getRoleId()+" "+login1.getUserId());
			msg.setAuth(true);
			msg.setText("successfully signed in");
			msg.setUserId(login1.getUserId());
			msg.setRoleId(login1.getRoleId());
			msg.setRole(login1.getRole());
			return new ResponseEntity<>( msg, HttpStatus.OK);
		}
		
		logger.trace("login method accessed");
		throw new UserNotFoundException("Invalid Credentials");
		
	}
	
	@DeleteMapping("/login/{id}")
	public ResponseEntity<Message> logOut(@PathVariable @Min(1) int id) {
		String message=service.signOut(id);
		if(message.equals("success")) {
			logger.info("succesfully signed out!!");
			Message msg=new Message();
			msg.setAuth(false);
			msg.setText("successfully signed out");
			msg.setUserId(0);
			msg.setRoleId(0);
			msg.setRole("");
			return new ResponseEntity<>(msg, HttpStatus.OK);
		}
		logger.trace("logout method accessed");
		throw new UserNotFoundException(message);
	}
	
	
}