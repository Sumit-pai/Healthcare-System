package com.healthcaresystem.healthcaresystem.service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.healthcaresystem.healthcaresystem.model.PatientHistory;
import com.healthcaresystem.healthcaresystem.repository.PatientHistoryRepo;

@Service
public class PatientHistoryService {	
	@Autowired
	PatientHistoryRepo repo;
	public PatientHistory addHistory(PatientHistory patienthistory) {
		PatientHistory p = repo.save(patienthistory);
		return p;		
   }
	public List<PatientHistory> getAllHistory() {
		
		List<PatientHistory>patienthistory = repo.findAll();
		return patienthistory;
	}
	public PatientHistory getHistoryById(int id)   
	{  
	return repo.findById(id).get();  
	}  
	public void update(PatientHistory patienthistory)   
	{  
	repo.save(patienthistory);  
	}  
	public void updateReports(int id,MultipartFile report) throws IOException {
		byte[] encoded = null;
		encoded = report.getBytes();
		PatientHistory patienthistory = repo.getOne(id);
		patienthistory.setReports(encoded);
		 repo.save(patienthistory);
	}
	public void getReport(int id,String path) throws IOException,FileNotFoundException,SecurityException  {
		PatientHistory patienthistory = repo.getOne(id);	
			OutputStream out = new FileOutputStream(path);
			out.write(patienthistory.getReports());
			out.close();
	}
}