package com.healthcaresystem.healthcaresystem.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthcaresystem.healthcaresystem.model.*;;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, String>{
	public Policy findByPolicyNumber(String policyNumber);
	
	@Override
	@Query(value = "SELECT * FROM policy WHERE active = 1", nativeQuery = true)
	public List<Policy> findAll();
	
	@Modifying
	@Query(value = "UPDATE policy SET active = 0 WHERE email_id = :emailId", nativeQuery = true)
	public void deleteById(@Param("emailId") String emailId);
	
}