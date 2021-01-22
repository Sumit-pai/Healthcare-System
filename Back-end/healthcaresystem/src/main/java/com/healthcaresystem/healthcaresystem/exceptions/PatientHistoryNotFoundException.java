package com.healthcaresystem.healthcaresystem.exceptions;

public class PatientHistoryNotFoundException extends RuntimeException {
private static final long serialVersionUID = 1L;
	
	public PatientHistoryNotFoundException(String message) {
		super(message);
	}
	public PatientHistoryNotFoundException() {
		super();
	}
	
}

