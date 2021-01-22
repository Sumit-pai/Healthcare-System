package com.healthcaresystem.healthcaresystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthcaresystem.healthcaresystem.model.PatientHistory;

@Repository
public interface PatientHistoryRepo extends JpaRepository<PatientHistory, Integer>{
	
}
