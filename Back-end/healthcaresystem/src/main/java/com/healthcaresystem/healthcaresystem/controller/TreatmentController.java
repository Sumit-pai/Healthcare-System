package com.healthcaresystem.healthcaresystem.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import com.healthcaresystem.healthcaresystem.model.Treatment;
import com.healthcaresystem.healthcaresystem.exceptions.TreatmentNotFoundException;
import com.healthcaresystem.healthcaresystem.service.TreatmentService;

@RestController
@RequestMapping("/api/v1/treatments")
@Validated
@CrossOrigin("*")
public class TreatmentController {

	
	@Autowired
	TreatmentService service;
	
	Logger logger = LoggerFactory.getLogger(TreatmentController.class);
	
	@PostMapping
	public ResponseEntity<String> addTreatment(@Valid @RequestBody Treatment treatment) {	
		service.addTreatment(treatment);
		return new ResponseEntity<>("Treatment added successfully!!", HttpStatus.CREATED);
	}
		
	@GetMapping
	public List<Treatment> getAllTreatments() {
		return service.getAllTreatment(); 	
	}
	
	@GetMapping("/{id}")
	public Treatment getTreatmentById(@PathVariable("id") @Min(1) Integer id) {
		Treatment treatment =  service.getTreatmentById(id);	
		
		if(treatment == null) {
			System.out.println("Unable to find Treatment with id "+id);
			throw new TreatmentNotFoundException("Unable to find Treatment with id "+id);
		}
		return treatment;
	}
	
	@GetMapping("/bydate")
	public List<Treatment> getTreatmentByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @NotNull LocalDate date) {
		List<Treatment> list = service.getTreatmentByDate(date);
		
		if(list.isEmpty()) {
			throw new TreatmentNotFoundException("No Treatment found on Date "+date);
		}
		return list;
	}
	
	@GetMapping("/bydates")
	public List<Treatment> getTreatmentByDate(@RequestParam("fromdate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @NotNull LocalDate fromDate,
			@RequestParam("todate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @NotNull LocalDate toDate) {
		List<Treatment> list = service.getTreatmentByDate(fromDate,toDate);
		
		if(list.isEmpty()) {
			throw new TreatmentNotFoundException("No Treatment found from Date: "+fromDate+" to Date: "+toDate);
		}
		return list;
	}
	
	@GetMapping("/bydoctor/{id}")
	public List<Treatment> getTreatmentByDoctorId(@PathVariable("id") @Min(1) int id){
		List<Treatment> list = service.getTreatmentByDoctorId(id);
		
		if(list.isEmpty()) {
			throw new TreatmentNotFoundException("Unable to find Treatment with Doctor Id: "+id);
		}
		return list;
	}
	
	@GetMapping("/bypatient/{id}")
	public List<Treatment> getTreatmentByPatientId(@PathVariable("id") @Min(1) int id){
		List<Treatment> list = service.getTreatmentByPatientId(id);
		if(list.isEmpty()) {
			throw new TreatmentNotFoundException("Unable to find Treatment with Patient Id: "+id);
		}
		return list;
	}
	
	
	@PatchMapping("/report/{id}")	
	public ResponseEntity<String> updateReport(@PathVariable("id") @Min(1) int id,@RequestParam("report") @NotNull MultipartFile report) throws IOException {
		if(report.getSize() == 0) {
			return new ResponseEntity<>("File can not be Null", HttpStatus.BAD_REQUEST);
		}
		service.updateReport(id, report);
		return new ResponseEntity<>("Reports updated successfully!!", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/report/{id:.+}", method = RequestMethod.GET, produces = "application/pdf")
	public ResponseEntity<InputStreamResource> getReport(@PathVariable("id") @Min(1) int id) throws IOException,SecurityException,NullPointerException {
		service.getReport(id);
		File pdfFile = new File("D:\\Users\\SUMIT\\Desktop\\Output\\report"+id+".pdf");
		InputStreamResource resource = new InputStreamResource(new FileInputStream(pdfFile));
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("application/pdf"));
		  headers.add("Access-Control-Allow-Origin", "*");
		  headers.add("Access-Control-Allow-Methods", "GET, POST, PUT");
		  headers.add("Access-Control-Allow-Headers", "Content-Type");
		  headers.add("Content-Disposition", "id=" + id);
		  headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		  headers.add("Pragma", "no-cache");
		  headers.add("Expires", "0");
		 
		  headers.setContentLength(pdfFile.length());
		  ResponseEntity<InputStreamResource> response = new ResponseEntity<InputStreamResource>(
				    resource, headers, HttpStatus.OK);
		  return response;
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
	@ExceptionHandler({EntityNotFoundException.class,TreatmentNotFoundException.class})
    public ResponseEntity<Object> handleEntityNotFoundException(Exception ex) {
		logger.error(ex.getMessage());
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
	
	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<Object> handleInvalidInputException(MethodArgumentTypeMismatchException ex) {
		logger.error(ex.getMessage());
		return new ResponseEntity<>("Invalid Input, Check the input given", HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	public ResponseEntity<Object> handleConstraintViolationException(Exception ex) {
		logger.error(ex.getMessage());
		return new ResponseEntity<>("Treatment with this Appointment Id already exist", HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler({ConstraintViolationException.class,IOException.class,FileNotFoundException.class,SecurityException.class,MissingServletRequestPartException.class})
	public ResponseEntity<Object> handleIOException(Exception ex) {
		logger.error(ex.getMessage());
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<Object> handleNullPointerException(NullPointerException ex) {
		logger.error(ex.getMessage());
		return new ResponseEntity<>("No Reports found, please update Report", HttpStatus.NOT_FOUND);
    }

}