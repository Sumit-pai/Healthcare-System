package com.healthcaresystem.healthcaresystem.service;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.healthcaresystem.entities.DocRegistration;
//import com.cpg.entities.SlotsAvailable;
//import com.cpg.entities.UpdateDoctorRegistration;
//import com.cpg.repository.DoctorRegistrationRepository;
//import com.cpg.repository.UserRepository;
import com.healthcaresystem.healthcaresystem.model.*;
import com.healthcaresystem.healthcaresystem.repository.DoctorRegistrationRepository;
import com.healthcaresystem.healthcaresystem.repository.UserRepository;

@Service
public class DoctorRegistrationService {
	
	@Autowired
	DoctorRegistrationRepository doctorRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Transactional
	public DocRegistration addDoctor(DocRegistration docRegistration){
		
		return doctorRepository.save(docRegistration);	
	}
	
	public DocRegistration removeDoctor(int doctorId) {
		Optional<DocRegistration> doctorRegistration=doctorRepository.findById(doctorId);
		if(doctorRegistration.empty() != null) {
		doctorRepository.deleteById(doctorId);
		return doctorRegistration.get();
		}	
		return null;
	}
	
	
	public DocRegistration updateDoctor(int doctorId, UpdateDoctorRegistration updateddocRegistration) {
			DocRegistration doctorRegistration = doctorRepository.getOne(doctorId);
			doctorRegistration.setSpecialization(updateddocRegistration.getSpecialization());
			doctorRegistration.setQualification(updateddocRegistration.getQualification());
			doctorRegistration.setExperience(updateddocRegistration.getExperience());
			doctorRegistration.setInTime(updateddocRegistration.getInTime());
			doctorRegistration.setOutTime(updateddocRegistration.getOutTime());
			return doctorRepository.save(doctorRegistration);	
		}

	
	public Optional<DocRegistration> getDoctor(int doctorId){
		return doctorRepository.findById(doctorId);
	}

	public List<DocRegistration> getAllDoctors(){
		return doctorRepository.findAll();
	}

	public List<DocRegistration> getRegisteredDoctorsByDates(LocalDate createdDate) {
		return doctorRepository.findByCreatedTime(createdDate);
	}
	
	public void updateSlots(int id) {
		DocRegistration doc = doctorRepository.getOne(id);
		LocalTime inTime = doc.getInTime();
		LocalTime outTime = doc.getOutTime();
		List<SlotsAvailable> list = new ArrayList<>();
		while(inTime.compareTo(outTime) < 0) {
			SlotsAvailable obj = new SlotsAvailable(inTime);
			list.add(obj);
			inTime = inTime.plusHours(1);
		}
		doc.setSlots(list);
		doctorRepository.save(doc);		
	}
	
	public void deleteSlot(int id,LocalTime time) {
		DocRegistration doc = doctorRepository.getOne(id);
		SlotsAvailable obj = new SlotsAvailable(time);
		List<SlotsAvailable> list = doc.getSlots();
		list.remove((list.indexOf(obj)));
		doc.setSlots(list);
		doctorRepository.save(doc);	
	}
	
	public List<DocRegistration> findBySpecialization(String specialization){
		return doctorRepository.findBySpecialization(specialization);
	}
	
	public List<SlotsAvailable> findSlotsByDoctorId(int id){
		DocRegistration doc = doctorRepository.getOne(id);
		return doc.getSlots();
	}

}