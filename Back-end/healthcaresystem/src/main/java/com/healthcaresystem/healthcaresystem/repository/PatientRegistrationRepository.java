package com.healthcaresystem.healthcaresystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import javax.validation.constraints.NotNull;

import com.healthcaresystem.healthcaresystem.model.PatientRegistration;
import com.healthcaresystem.healthcaresystem.model.User;

@Repository
public interface PatientRegistrationRepository extends JpaRepository<PatientRegistration, Integer>{
	
	
	PatientRegistration findByUser(User user);

	@Query(value="select * from patient p where (Date(p.created_at)= :date )",nativeQuery = true)
	List<PatientRegistration> findByCreatedTime(@Param("date")  @NotNull LocalDate date);
	
}