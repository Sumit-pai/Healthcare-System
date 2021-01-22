package com.healthcaresystem.healthcaresystem.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.healthcaresystem.healthcaresystem.exceptions.DoctorNotFoundException;
import com.healthcaresystem.healthcaresystem.exceptions.InvalidPatientException;
import com.healthcaresystem.healthcaresystem.exceptions.UserNotFoundException;
import com.healthcaresystem.healthcaresystem.model.DocRegistration;
import com.healthcaresystem.healthcaresystem.model.UpdateDoctorRegistration;
import com.healthcaresystem.healthcaresystem.service.DoctorRegistrationService;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/doctor")
@Validated
public class DoctorRegistrationController {
	
	@Autowired
	DoctorRegistrationService service;
	
	Logger logger = LoggerFactory.getLogger(DoctorRegistrationController.class);
	
	@PostMapping("adddoctor")
	public ResponseEntity<DocRegistration> addDoctor( @Valid @RequestBody DocRegistration docRegistration) {
		
		
		DocRegistration docRegistration1 = service.addDoctor(docRegistration);
		
		if(docRegistration1!=null) {
			logger.info("Doctor successfully registered");
			return new ResponseEntity<>(docRegistration1,HttpStatus.OK);
		}
		
		logger.trace("add doctor method accessed");
		throw new DoctorNotFoundException("Doctors details can not be null");
	}
	
	@GetMapping("getAll")
	public ResponseEntity<List<DocRegistration>> getAllDoctors() {
		List<DocRegistration> list =  service.getAllDoctors();
		if(list.isEmpty()) {
			logger.trace("getAllDoctors method accessed");
			throw new InvalidPatientException("No Doctors found");
		}
		
		return new ResponseEntity<>(list,HttpStatus.OK);
	}
	
	@SuppressWarnings("static-access")
	@GetMapping("getone/{id}")
	public Optional<DocRegistration> getDoctor(@PathVariable @Min(1) int id) {
		Optional<DocRegistration> doctorRegistration = service.getDoctor(id);
		if(doctorRegistration.empty() == null) {
			throw new DoctorNotFoundException("Unable to find Doctor with id "+id);
		}
		return doctorRegistration;
	}
	
/*	@DeleteMapping("/deletedoctor/{id}")
	public DocRegistration deleteDcotor(@PathVariable @Min(1) int id) {
		DocRegistration doctorRegistration = service.removeDoctor(id);
		if(doctorRegistration!=null) {
			return doctorRegistration;
		}
		throw new DoctorNotFoundException("Invalid doctor id: "+id);
	}*/
	
	@PatchMapping("/updatedoctor/{id}")
	public DocRegistration updateDoctor(@PathVariable @Min(1) int id,@Valid @RequestBody UpdateDoctorRegistration doctorRegistration) {
		return service.updateDoctor(id, doctorRegistration);
	}
	
	
	@GetMapping("/doctorbydate/")
	public List<DocRegistration> getDoctorsByDate(@RequestParam("date") @DateTimeFormat(iso = ISO.DATE) @NotNull LocalDate date){
		List<DocRegistration> list = service.getRegisteredDoctorsByDates(date);
		if(list.isEmpty()) {
			throw new DoctorNotFoundException("Not found any Doctor Registration on date: "+date);
		}
		return list;
	}
		
	@GetMapping("/doctorbyspecialization")
	public List<DocRegistration> getDoctorsBySpecialization(@RequestParam("specialization") @NotNull @NotBlank String specialization ){
		List<DocRegistration> list = service.findBySpecialization(specialization);
		if(list.isEmpty()) {
			throw new DoctorNotFoundException("Unable to find Doctor with specialization: "+specialization);
		}
		return list;
	}
	
	//ExceptionHander
		@ResponseStatus(HttpStatus.BAD_REQUEST)
		@ExceptionHandler(MethodArgumentNotValidException.class)
		public Map<String, String> handleValidationExceptions(
		  MethodArgumentNotValidException ex) {
		    Map<String, String> errors = new HashMap<>();
		    ex.getBindingResult().getAllErrors().forEach(error -> {
		        String fieldName = ((FieldError) error).getField();
		        String errorMessage = error.getDefaultMessage();
		        logger.error(errorMessage);
		        errors.put(fieldName, errorMessage);
		    });
		    return errors;
		}
		@ExceptionHandler({EntityNotFoundException.class,DoctorNotFoundException.class,UserNotFoundException.class})
	    public ResponseEntity<Object> handleEntityNotFoundException(Exception ex) {
			logger.error(ex.getMessage());
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	    }
		
		@ExceptionHandler(MethodArgumentTypeMismatchException.class)
		public ResponseEntity<Object> handleInvalidInputException(MethodArgumentTypeMismatchException ex) {
			logger.error(ex.getMessage());
			return new ResponseEntity<>("Invalid Input, Check the input given", HttpStatus.BAD_REQUEST);
	    }
		//Used for the Request parameter validation
		@ExceptionHandler(ConstraintViolationException.class)
		public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException ex) {
			logger.error(ex.getMessage());
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	    }
}