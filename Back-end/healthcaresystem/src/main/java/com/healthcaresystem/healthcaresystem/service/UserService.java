package com.healthcaresystem.healthcaresystem.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcaresystem.healthcaresystem.model.Admin;
import com.healthcaresystem.healthcaresystem.model.PatientRegistration;
import com.healthcaresystem.healthcaresystem.model.User;
import com.healthcaresystem.healthcaresystem.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	@Transactional
	public User addUser(User user){
		return userRepository.save(user);	
	}
	
	
	@Transactional
	public User updateUser(int userId, User user) {
		User user1=userRepository.getOne(userId);
		BeanUtils.copyProperties(user, user1, "userId","password","role","approve","email");
		return userRepository.save(user1);
	}
	
	
	@Transactional
	public User removeUser(int userId){
		Optional<User> user=userRepository.findById(userId);
		if(user.empty()!=null) {
			userRepository.deleteById(userId);
			return user.get();
		}
		return null;
	}
	
	
	@Transactional
	public User getUser(int userId){
		
		Optional<User> user = userRepository.findById(userId);
		if(user.empty()==null)
			return null;
		else
			return user.get();
	}
	

	@Transactional
	public User approve(int userId, User user) {
		// TODO Auto-generated method stub
		User user1=userRepository.getOne(userId);
		BeanUtils.copyProperties(user, user1, "userId", "name","age","gender","password","email","contactNumber","address","role");
		return userRepository.save(user1);
		
	}
	
}