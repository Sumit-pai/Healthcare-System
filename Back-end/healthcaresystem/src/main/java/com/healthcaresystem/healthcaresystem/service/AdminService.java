package com.healthcaresystem.healthcaresystem.service;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcaresystem.healthcaresystem.model.Admin;
import com.healthcaresystem.healthcaresystem.repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;
	
	@Transactional
	public Admin addAdmin(Admin admin){
		return adminRepository.save(admin);
	}
	
	public Admin removeAdmin(int adminId){
		adminRepository.deleteById(adminId);
		return null; 	
	}
	
	public List<Admin> getRegisteredAdminsByDates(LocalDate createdTime) {
		return adminRepository.findByCreatedTime(createdTime);
	}
	
}
