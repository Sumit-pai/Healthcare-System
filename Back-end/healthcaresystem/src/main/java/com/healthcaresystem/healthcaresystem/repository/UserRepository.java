package com.healthcaresystem.healthcaresystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthcaresystem.healthcaresystem.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	public void deleteByUserId(int userId);
	public User findByEmail(String email);
}
