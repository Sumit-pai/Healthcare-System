package com.healthcaresystem.healthcaresystem.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import javax.validation.constraints.Min;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthcaresystem.healthcaresystem.exceptions.AppointmentNotFoundException;
import com.healthcaresystem.healthcaresystem.exceptions.DoctorNotFoundException;
import com.healthcaresystem.healthcaresystem.model.Appointment;
import com.healthcaresystem.healthcaresystem.model.DocRegistration;
import com.healthcaresystem.healthcaresystem.model.Finance;
import com.healthcaresystem.healthcaresystem.model.PatientRegistration;
import com.healthcaresystem.healthcaresystem.repository.DoctorRegistrationRepository;
import com.healthcaresystem.healthcaresystem.repository.PatientRegistrationRepository;
import com.healthcaresystem.healthcaresystem.service.AppointmentService;
import com.healthcaresystem.healthcaresystem.service.DoctorRegistrationService;
import com.healthcaresystem.healthcaresystem.service.PatientRegistrationService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/appointment")
public class AppointmentController {
	
	@Autowired
	AppointmentService appointmentService;
	
//	@Autowired
//	DoctorRegistrationService doctorRegistrationService;
//	
//	@Autowired
//	PatientRegistrationService patientRegistrationService;
//	
	
	@PostMapping("/")
	public Appointment addAppointment(@RequestBody Appointment appointment) {	
//		List<DocRegistration> list =  doctorRepo.findAll();
//		List<PatientRegistration> list2=patientRepo.findAll();
////		DocRegistration doctor=list.get(0);
////		PatientRegistration patient=list2.get(0);
////		System.out.println(list);
////		System.out.println(list2);
//		
//		Appointment appointment1=new Appointment();
//		appointment1.getPatientId(); 
//		appointment1.getDoctorId();
////	appointment1.setDoctorId(doctor.getDoctorId());
//		appointment1.setTimings( LocalTime.parse("09:00"));
//		appointment1.setCreatedAt(LocalDateTime.now());
//		appointment1.setUpdatedAt(LocalDateTime.now());
//		
//		
//		return appointmentService.addAppointment(appointment1);	
//		List<DocRegistration> doctorsList = doctorRegistrationService.getAllDoctors();
//		List<PatientRegistration> patientList = patientRegistrationService.getAllPatientsById(patientId);
//		
//		//if same number of doctors and patients are present in the database.
//		
//		int listLength = doctorsList.size();
//		
//		for(int i=0;i<listLength;i++) {
//			
//			//getting both patient and doctor ID's
//			int doctorId = doctorsList.get(i);
//			int patientId = patientList.get(i);
//			
//			Appointment appointment1 = new Appointment();
//			appointment1.setDoctorId(doctorId);
//			appointment1.setPatientId(patientId);
//			
//			//adding to database
			return appointmentService.addAppointment(appointment);
	}
		
	
	
	@GetMapping("/")
	public List<Appointment> getAllAppointments() {
		return appointmentService.getAllAppointment(); 	
	}
	
	
//	@GetMapping("/{id}")
//	public Optional<Appointment> getAppointmentById(@PathVariable("id") Integer id) throws AppointmentNotFoundException {
//		Optional<Appointment> appointment =  appointmentService.getAppointmentById(id);	
//		
//		if(Optional.empty() != null) {
//			throw new AppointmentNotFoundException("Unable to find appointment with id "+id);
//		}
//		return appointment;
//	}
	@GetMapping("/getById/{id}")
	public ResponseEntity<Optional<Appointment>> getAppointmentById(@PathVariable ("id") int id) {
	Optional<Appointment> optionalAppointment = appointmentService.getAppointmentById(id);
		return new ResponseEntity<>(optionalAppointment, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public Appointment deleteAppointment(@PathVariable @Min(1) int id) {
		 Appointment appointment = appointmentService.removeAppointment(id);
		
			return appointment;
	}
	
	@GetMapping("/bydoctor/{doctorId}")
	public Appointment getAppointmentByDoctorId(@PathVariable("doctorId") int doctorId){
		Appointment appointment = appointmentService.getAppointmentByDoctorId(doctorId);
		return appointment;
	}
	
	@GetMapping("/bypatient/{patientId}")
	public Appointment getAppointmentByPatientId(@PathVariable("patientId") int patientId){
		Appointment appointment = appointmentService.getAppointmentByPatientId(patientId);
		if(appointment== null) {
			try {
				throw new AppointmentNotFoundException("Unable to find Appointment with Patient Id: "+patientId);
			} catch (AppointmentNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return appointment;
	}
	
	
	
	@GetMapping("/bydate")
	public List<Appointment> getAppointmentByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) throws AppointmentNotFoundException {
		List<Appointment> list = appointmentService.getAppointmentByDate(date);
		
		if(list.isEmpty()) {
			throw new AppointmentNotFoundException("Unable to find Appointment on Date "+date);
		}
		return list;
	}
	
}
