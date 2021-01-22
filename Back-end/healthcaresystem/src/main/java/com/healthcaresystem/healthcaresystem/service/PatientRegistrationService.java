package com.healthcaresystem.healthcaresystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcaresystem.healthcaresystem.model.PatientRegistration;
import com.healthcaresystem.healthcaresystem.model.User;
import com.healthcaresystem.healthcaresystem.repository.PatientRegistrationRepository;
import com.healthcaresystem.healthcaresystem.repository.UserRepository;

@Service
public class PatientRegistrationService {
	
	@Autowired
	private PatientRegistrationRepository patientRepository; 
	
	@Autowired
	private UserRepository userRepository;

	@Transactional
	public PatientRegistration addPatient(PatientRegistration patientRegistration){
		
		return patientRepository.save(patientRegistration);	
	}

	@Transactional
	public PatientRegistration removePatient(int patientId){
		
		Optional<PatientRegistration> patientRegistration=patientRepository.findById(patientId);
		
		if(patientRegistration.empty() != null) {
			//int userId = patientRegistration.get().getUser().getUserId();
			patientRepository.deleteById(patientId);
			//userRepository.deleteByUserId(userId);
			return patientRegistration.get();
		}
		return null;
		
	}

	@Transactional
	public PatientRegistration updatePatient(int patientId, PatientRegistration patientRegistration) {
		
		Optional<PatientRegistration> patientRegistration1=patientRepository.findById(patientId);
		
		if(patientRegistration1.empty()==null || patientRegistration==null) {
			return null;
		}
		
		else {
			PatientRegistration patientRegistration2 = patientRegistration1.get();
			//User user = patientRegistration2.getUser();
			BeanUtils.copyProperties(patientRegistration, patientRegistration2,"patientId","user");
			//BeanUtils.copyProperties(patientRegistration.getUser(), user, "userId");
			return patientRepository.save(patientRegistration2);	
		}
	}

	@Transactional
	public PatientRegistration getPatient(int patientId){
		
		Optional<PatientRegistration> patientRegistration = patientRepository.findById(patientId);
		
		if(patientRegistration.empty() == null)
			return null;
		else
			return patientRegistration.get();
	}

	@Transactional
	public List<PatientRegistration> getAllPatients(){
		
		return patientRepository.findAll();
	}


	@Transactional
	public List<PatientRegistration> getPatientByDate(@NotNull LocalDate date) {
		
		return  patientRepository.findByCreatedTime(date);
	}
	
}