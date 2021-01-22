package com.healthcaresystem.healthcaresystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcaresystem.healthcaresystem.model.Login;

public interface LoginRepository extends JpaRepository<Login, Integer>{
	
	public Login findByEmailId(String emailId);

}