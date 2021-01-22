package com.healthcaresystem.healthcaresystem.exceptions;

public class InvalidPatientException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidPatientException(String message) {
		super(message);
	}
	
}
