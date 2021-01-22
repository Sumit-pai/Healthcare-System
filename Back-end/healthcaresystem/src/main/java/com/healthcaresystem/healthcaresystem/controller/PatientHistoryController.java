package com.healthcaresystem.healthcaresystem.controller;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthcaresystem.healthcaresystem.model.PatientHistory;
import com.healthcaresystem.healthcaresystem.service.PatientHistoryService;

@RestController
@RequestMapping("/api/v1/patienthistory")

public class PatientHistoryController {
	@Autowired
	PatientHistoryService service;
	
Logger logger = LoggerFactory.getLogger(PatientHistoryController.class);
@PostMapping("add")
public  ResponseEntity<PatientHistory> addHistory(@RequestBody PatientHistory patienthistory) {	
	service.addHistory(patienthistory);
	logger.info("[+] History added successfully");
	return new ResponseEntity<>(patienthistory, HttpStatus.CREATED);
}
@GetMapping("getall")
public List<PatientHistory> getAllHistory() {
	logger.trace("[+] getAllPolicies method accessed");
	return service.getAllHistory();	
}
@GetMapping("/patient/{pid}")  
private PatientHistory getHistorybyId(@PathVariable("pid") int pid)   
{  
return service.getHistoryById(pid);  
}  
@PutMapping("/UpdateHistory/")  
private PatientHistory update(@RequestBody PatientHistory patienthistory)   
{  
service.update(patienthistory);  
return patienthistory;  
}  

@PatchMapping("/reportupdate/{id}")	
public void updateReports(@PathVariable("id") @Min(1) int id,@RequestParam("report") @NotNull MultipartFile report) throws IOException {
	service.updateReports(id, report);
	//return new ResponseEntity<List<PatientHistory>>(HttpStatus.OK);
}

@GetMapping("/report/{id}")
public void getReport(@PathVariable("id") @Min(1) int id,@RequestParam("path") @NotNull @NotBlank String path) throws IOException,FileNotFoundException,SecurityException {
	service.getReport(id, path);
	//return new ResponseEntity<>(HttpStatus.OK);
}

}
