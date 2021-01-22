package com.healthcaresystem.healthcaresystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code=HttpStatus.NOT_FOUND,reason = "Invalid Medical Fee")
public class InvalidMedicalFeeException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidMedicalFeeException(String message) {
		super(message);
	}
	
}
