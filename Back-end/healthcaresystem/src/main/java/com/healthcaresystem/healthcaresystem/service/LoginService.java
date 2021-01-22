package com.healthcaresystem.healthcaresystem.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcaresystem.healthcaresystem.model.DocRegistration;
import com.healthcaresystem.healthcaresystem.model.Login;
import com.healthcaresystem.healthcaresystem.model.PatientRegistration;
import com.healthcaresystem.healthcaresystem.model.User;
import com.healthcaresystem.healthcaresystem.repository.AdminRepository;
import com.healthcaresystem.healthcaresystem.repository.DoctorRegistrationRepository;
import com.healthcaresystem.healthcaresystem.repository.LoginRepository;
import com.healthcaresystem.healthcaresystem.repository.PatientRegistrationRepository;
import com.healthcaresystem.healthcaresystem.repository.UserRepository;

@Service
public class LoginService {
	@Autowired
	LoginRepository loginRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PatientRegistrationRepository patientRegistrationRepository;
	
	@Autowired
	DoctorRegistrationRepository doctorRegistrationRepository;
	
	@Autowired
	AdminRepository adminRepository;
	
	@Transactional
	public Login signIn(Login login) {
		Login login1=loginRepository.findByEmailId(login.getEmailId());

		if(login1==null) {
		User user=userRepository.findByEmail(login.getEmailId());
		if(user==null) {
			return null;
		}
		else {
			if(user.isApprove()) {
			if(user.getPassword().equals(login.getPassword())) {
				if(user.getRole().equals("Patient")) {
					PatientRegistration patientRegistration = patientRegistrationRepository.findByUser(user);
					System.out.println(patientRegistration);
					login.setRoleId(patientRegistration.getPatientId());
					login.setUserId(user.getUserId());
					login.setRole("Patient");
					loginRepository.save(login);
					return login;
				}
				else if(user.getRole().equals("Doctor")) {
					DocRegistration docRegistration = doctorRegistrationRepository.findByUser(user);
					System.out.println(docRegistration);
					login.setRoleId(docRegistration.getDoctorId());
					login.setUserId(user.getUserId());
					login.setRole("Doctor");
					loginRepository.save(login);
					return login;
				}
				else if(user.getRole().equals("Admin")) {
					login.setUserId(user.getUserId());
					login.setRole("Admin");
					loginRepository.save(login);
					return login;
				}
				return null;
			
			}
			else
				return null;
			}
			else
				return null;
			}
			
		}
		else
			return null;
		
		
	}
	

	@Transactional
	public String signOut(int id) {
		Optional<User> user = userRepository.findById(id);
		if(user.isPresent()) {
			String email=user.get().getEmail();
			Login login=loginRepository.findByEmailId(email);
			if(login!=null) {
				loginRepository.deleteById(login.getId());
				return "success";
			}
			
		}
		return "Please login";
		
	}
	
	
}