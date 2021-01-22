package com.healthcaresystem.healthcaresystem.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int userId;
	String name;
	String gender;
	String password;
	String email;
	int age;
	String contactNumber;
	String address;
	String role;
	boolean approve=true;
	
	public User() {
		
	}
	public User(String name, String gender, String password, String email, int age, String contactNumber, String address,
			String role) {
		super();
		this.name = name;
		this.gender = gender;
		this.password = password;
		this.email = email;
		this.age = age;
		this.contactNumber = contactNumber;
		this.address = address;
		this.role = role;
	}
	
	

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public int getUserId() {
		return userId;
	}
	
	public boolean isApprove() {
		return approve;
	}
	public void setApprove(boolean approve) {
		this.approve = approve;
	}
	@Override
	public String toString() {
		return "User [name=" + name + ", gender=" + gender + ", password=" + password
				+ ", email=" + email + ", age=" + age + ", contactNumber=" + contactNumber + ", address=" + address
				+ ", role=" + role + "]";
	}
	
	
}
