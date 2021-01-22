package com.healthcaresystem.healthcaresystem.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthcaresystem.healthcaresystem.model.Admin;
import com.healthcaresystem.healthcaresystem.service.AdminService;

@RestController
public class AdminController {

	@Autowired
	AdminService service;
	
	@PostMapping("/addAdmin")
	public Admin addAdmin(@RequestBody Admin admin) {
		return service.addAdmin(admin);
	}
	
	@DeleteMapping("/removeAdmin/{id}")
	public void deleteAdmin(@PathVariable int id) {
		service.removeAdmin(id);
	}
	
	@GetMapping("/getAdmins/{date}")
	public List<Admin> getAdminsByDate(@RequestParam("date") @DateTimeFormat(iso = ISO.DATE) LocalDate createdTime){
		System.out.println(createdTime);
		return service.getRegisteredAdminsByDates(createdTime);
	}
	
}
