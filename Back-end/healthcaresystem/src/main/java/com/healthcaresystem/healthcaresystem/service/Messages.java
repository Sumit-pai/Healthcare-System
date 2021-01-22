package com.healthcaresystem.healthcaresystem.service;

public class Messages {
	
	int userId;
	int id;
	String role;
	
	
	public Messages(int userId, int id, String role) {
		super();
		this.userId = userId;
		this.id = id;
		this.role = role;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	

}
