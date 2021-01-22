package com.healthcaresystem.healthcaresystem.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

//import com.healthcaresystem.*;
import com.healthcaresystem.healthcaresystem.model.Treatment;

public interface TreatmentRepo extends JpaRepository<Treatment, Integer>{

	@Query(value="select * from treatment t where Date(t.created_at)= :date",nativeQuery = true)
	List<Treatment> findByCreatedAt(@Param("date") LocalDate date);
	
	@Query(value="select * from treatment t where (Date(t.created_at)>= :fromdate and Date(t.created_at)<= :todate)",nativeQuery = true)
	List<Treatment> findByCreatedAt(@Param("fromdate") LocalDate fromdate,@Param("todate") LocalDate todate);
	
	@Query("select t from Appointment a JOIN Treatment t ON a.appointmentId = t.appointmentId where a.doctorId= :id")
	List<Treatment>findByDoctorId(@Param("id")Integer id);
	

	@Query("select t from Appointment a JOIN Treatment t ON a.appointmentId = t.appointmentId where a.patientId= :id")
	List<Treatment>findByPatientId(@Param("id")Integer id);
	
}

