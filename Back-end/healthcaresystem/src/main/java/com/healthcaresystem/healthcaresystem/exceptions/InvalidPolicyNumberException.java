package com.healthcaresystem.healthcaresystem.exceptions;

public class InvalidPolicyNumberException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidPolicyNumberException(String message) {
		super(message);
	}
	
}
