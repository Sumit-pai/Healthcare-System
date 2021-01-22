package com.healthcaresystem.healthcaresystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthcaresystem.healthcaresystem.model.Admin;
import com.healthcaresystem.healthcaresystem.model.User;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>{
	
	 Admin findByUser(User user) ;
	
	@Query(value = "select * from admin where Date(created_at)=:d", nativeQuery = true)
	List<Admin> findByCreatedTime(@Param("d") LocalDate createdTime);
}
