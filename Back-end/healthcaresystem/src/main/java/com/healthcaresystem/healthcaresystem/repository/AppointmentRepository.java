package com.healthcaresystem.healthcaresystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcaresystem.healthcaresystem.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer>{
	
	public Appointment findByDoctorId(int doctorId);
	
	public Appointment findByPatientId(int patientId);
	
	
	@Query(value="select * from appointment a where Date(t.created_at)= :date",nativeQuery = true)
	public List<Appointment> findByCreatedAt(@Param("date") LocalDate date);
	
}
