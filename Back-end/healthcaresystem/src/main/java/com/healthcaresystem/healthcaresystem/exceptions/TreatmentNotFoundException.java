package com.healthcaresystem.healthcaresystem.exceptions;

public class TreatmentNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public TreatmentNotFoundException(String message) {
		super(message);
	}
	public TreatmentNotFoundException() {
		super();
	}
	
}
