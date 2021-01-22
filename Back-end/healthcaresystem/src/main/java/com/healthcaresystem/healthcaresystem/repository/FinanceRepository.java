package com.healthcaresystem.healthcaresystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcaresystem.healthcaresystem.model.Finance;

public interface FinanceRepository extends JpaRepository<Finance, Integer>{
	Finance findByFinanceId(int financeId);
	@Query(value="select * from Finance where Date(created_time)= :date",nativeQuery = true)
	List<Finance> findByCreatedTime(@Param("date") LocalDate createdTime);
}
