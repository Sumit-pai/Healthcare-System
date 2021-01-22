package com.healthcaresystem.healthcaresystem.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

@Entity(name="Login")
@Table
public class Login {

	@Id @GeneratedValue
	@Column(name="id")
	private int id;
	
	@NotNull
	@Column(name = "emailId")
	private String emailId;
	
	@NotNull
	@Column(name = "password")
	private String password;
	
	@Transient
	int userId;
	
	@Transient
	int roleId;
	
	@Transient
	String role;
   
	// constructor
	public Login() {

	}

	public Login(String emailId, String password) {
		super();
		this.emailId=emailId;
		this.password = password;
		
	}

	
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

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

	
	public String getPassword() {
		return password;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	public int getId() {
		return id;
	}


	@Override
	public String toString() {
		return "User [emailId=" + emailId + ", password=" + password + "]";
	}
	
}