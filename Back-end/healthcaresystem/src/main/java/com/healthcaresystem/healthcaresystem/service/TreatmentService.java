package com.healthcaresystem.healthcaresystem.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.healthcaresystem.healthcaresystem.model.Appointment;
import com.healthcaresystem.healthcaresystem.model.DocRegistration;
import com.healthcaresystem.healthcaresystem.model.PatientRegistration;
import com.healthcaresystem.healthcaresystem.model.Treatment;
import com.healthcaresystem.healthcaresystem.repository.AppointmentRepository;
import com.healthcaresystem.healthcaresystem.repository.DoctorRegistrationRepository;
import com.healthcaresystem.healthcaresystem.repository.PatientRegistrationRepository;
import com.healthcaresystem.healthcaresystem.repository.TreatmentRepo;


@Service
public class TreatmentService {
	
	@Autowired
	TreatmentRepo repo;
	
	@Autowired
	AppointmentRepository appRepo;
	
	@Autowired
	DoctorRegistrationRepository docRepo;
	
	@Autowired
	PatientRegistrationRepository patRepo;
	
	public Treatment addTreatment(Treatment treatment) {
		return repo.save(treatment);
				
	}
	public List<Treatment> getAllTreatment() {
		List<Treatment> treatments =  repo.findAll();
		for(Treatment tObj : treatments) {
			Appointment aObj = appRepo.getOne(tObj.getAppointmentId());
			DocRegistration dObj = docRepo.getOne(aObj.getDoctorId());
			PatientRegistration pObj = patRepo.getOne(aObj.getPatientId());
			String docName = dObj.getUser().getName();
			String patName = pObj.getUser().getName();
			tObj.setDoctorName(docName);
			tObj.setPatientName(patName); 		
		}
		return treatments;
	}
	
	
	public Treatment getTreatmentById(int treatmentId) {
		Treatment tObj = repo.findById(treatmentId).get();
		Appointment aObj = appRepo.getOne(tObj.getAppointmentId());
		DocRegistration dObj = docRepo.getOne(aObj.getDoctorId());
		PatientRegistration pObj = patRepo.getOne(aObj.getPatientId());
		String docName = dObj.getUser().getName();
		String patName = pObj.getUser().getName();
		tObj.setDoctorName(docName);
		tObj.setPatientName(patName);
		return tObj;
	}
	
	public List<Treatment> getTreatmentByDate(LocalDate date) {	
		return repo.findByCreatedAt(date);
	}
	
	public List<Treatment> getTreatmentByDate(LocalDate fromDate,LocalDate toDate) {	
		return repo.findByCreatedAt(fromDate,toDate);
	}
	
	public List<Treatment> getTreatmentByDoctorId(int doctorId) {
		List<Treatment> treatments = repo.findByDoctorId(doctorId);
		
		for(Treatment tObj : treatments) {
			Appointment aObj = appRepo.getOne(tObj.getAppointmentId());
			DocRegistration dObj = docRepo.getOne(aObj.getDoctorId());
			PatientRegistration pObj = patRepo.getOne(aObj.getPatientId());
			String docName = dObj.getUser().getName();
			String patName = pObj.getUser().getName();
			tObj.setDoctorName(docName);
			tObj.setPatientName(patName); 		
		}
		return treatments;
	}
	
	public List<Treatment> getTreatmentByPatientId(int patientId) {
		List<Treatment> treatments = repo.findByPatientId(patientId);
		for(Treatment tObj : treatments) {
			Appointment aObj = appRepo.getOne(tObj.getAppointmentId());
			DocRegistration dObj = docRepo.getOne(aObj.getDoctorId());
			PatientRegistration pObj = patRepo.getOne(aObj.getPatientId());
			String docName = dObj.getUser().getName();
			String patName = pObj.getUser().getName();
			tObj.setDoctorName(docName);
			tObj.setPatientName(patName); 		
		}
		return treatments;
	}
	
	public void updateReport(int id,MultipartFile report) throws IOException {
		byte[] encoded = null;
		encoded = report.getBytes();
		Treatment existingTreatment = repo.getOne(id);
		existingTreatment.setReport(encoded);
		repo.save(existingTreatment);
	}
	
	public OutputStream getReport(int id) throws IOException,SecurityException,NullPointerException  {
		Treatment treatment = repo.getOne(id);				
			OutputStream out = new FileOutputStream("D:\\Users\\SUMIT\\Desktop\\Output\\report"+id+".pdf");
			out.write(treatment.getReport());
			out.close();
			return out;
	}
	
}