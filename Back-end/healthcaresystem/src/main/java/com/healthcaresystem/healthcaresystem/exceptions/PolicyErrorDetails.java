package com.healthcaresystem.healthcaresystem.exceptions;

import java.time.LocalDateTime;
import java.util.List;

import com.healthcaresystem.healthcaresystem.model.Policy;


public class PolicyErrorDetails {
	
	private LocalDateTime timestamp;
	private String message;
	private String url;
	private List<Policy> policies;
	
	
	public PolicyErrorDetails(LocalDateTime timestamp, String message, String url, List<Policy> policies) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.url = url;
		this.policies = policies;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<Policy> getPolicies() {
		return policies;
	}

	public void setPolicies(List<Policy> policies) {
		this.policies = policies;
	}	
}
