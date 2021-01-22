//package com.cpg.repository;

//package com.cpg.repository;
package com.healthcaresystem.healthcaresystem.repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.healthcaresystem.healthcaresystem.model.*;


public interface DoctorRegistrationRepository extends JpaRepository<DocRegistration, Integer> {
	
	
	DocRegistration findByUserName(String name);
	DocRegistration findByUser(User user);
	
	@Query(value = "select * from doctor where Date(created_at)=:date", nativeQuery = true)
	List<DocRegistration> findByCreatedTime(@Param("date") LocalDate date);
	
	List<DocRegistration> findBySpecialization(String specialization);

}