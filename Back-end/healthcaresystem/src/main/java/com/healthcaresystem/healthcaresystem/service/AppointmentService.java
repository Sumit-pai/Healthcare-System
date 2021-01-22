package com.healthcaresystem.healthcaresystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcaresystem.healthcaresystem.model.Appointment;
import com.healthcaresystem.healthcaresystem.model.DocRegistration;
import com.healthcaresystem.healthcaresystem.repository.AppointmentRepository;
import com.healthcaresystem.healthcaresystem.repository.DoctorRegistrationRepository;

@Service
public class AppointmentService {
	@Autowired
	AppointmentRepository appointmentRepository;
	
	@Autowired
	DoctorRegistrationRepository doctorRegistrationRepository;
	
	public Appointment addAppointment(Appointment appointment) {
		
		DocRegistration docRegistration= doctorRegistrationRepository.findByUserName(appointment.getDoctorName());
		appointment.setDoctorId(docRegistration.getDoctorId());
		
		Appointment appoint = appointmentRepository.save(appointment);
		return appoint;		
	}
	
	public List<Appointment> getAllAppointment() {
		
		List<Appointment>appointment = appointmentRepository.findAll();
		return appointment;
	}
	
	public Optional<Appointment> getAppointmentById(int appointmentId) {
		Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);	
		return appointment;
	}
	
	public Appointment getAppointmentByDoctorId(int doctorId) {
		Appointment appointment = appointmentRepository.findByDoctorId(doctorId);					
		return appointment;
	}
	
	public Appointment getAppointmentByPatientId(int patientId) {
		Appointment appointment= appointmentRepository.findByPatientId(patientId);	
		return appointment;
	}
	
	public List<Appointment> getAppointmentByDate(LocalDate date) {	
		List<Appointment> appointment = appointmentRepository.findByCreatedAt(date);
		return appointment;
	}
	public Appointment removeAppointment(int appointmentId) {
		Optional<Appointment> appointment=appointmentRepository.findById(appointmentId);
		appointmentRepository.deleteById(appointmentId);
		return appointment.get();
		}	
		
	
}

