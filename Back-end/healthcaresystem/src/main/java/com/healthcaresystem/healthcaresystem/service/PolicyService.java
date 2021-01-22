package com.healthcaresystem.healthcaresystem.service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.healthcaresystem.healthcaresystem.exceptions.InvalidAmountException;
import com.healthcaresystem.healthcaresystem.exceptions.InvalidPolicyNumberException;
import com.healthcaresystem.healthcaresystem.model.*;
import com.healthcaresystem.healthcaresystem.repository.*;;

@Service
public class PolicyService {

	@Autowired
	PolicyRepository policyRepository;
	
	private static final String INVALID_POLICY_NUMBER_FORMAT_MESSAGE = "Invalid policy number format";
	
	private boolean checkPolicyNumber(String policyNumber) {
		String regex = "^[0-9A-Z]{14}$";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(policyNumber);
		return matcher.find();
	}
	
	
	public List<Policy> getAllPolicies(){
		return policyRepository.findAll();
	}
	
	public Policy getPolicyByEmailId(String emailId) {
		Policy policy = null;
		Optional<Policy> optionalPolicy = policyRepository.findById(emailId);
		if(optionalPolicy.isPresent())
			policy = optionalPolicy.get();
		
		return policy;
	}
	
	public Policy getPolicyByPolicyNumber(String policyNumber) {
		
		if(!checkPolicyNumber(policyNumber))
			throw new InvalidPolicyNumberException(INVALID_POLICY_NUMBER_FORMAT_MESSAGE);
		
		Policy policy = null;
		policy = policyRepository.findByPolicyNumber(policyNumber);
		return policy;
	}
	
	public Policy addPolicy(Policy policy) {
		if(policy.getPolicyNumber() != null && policy.getMaximumAmount() != 0) {
			if(!checkPolicyNumber(policy.getPolicyNumber()))
				throw new InvalidPolicyNumberException(INVALID_POLICY_NUMBER_FORMAT_MESSAGE);
			
			if(policy.getMaximumAmount() <= 0)
				throw new InvalidAmountException("Amount should be greater than 0");
		}
		return policyRepository.saveAndFlush(policy);
	}
	
	public Policy deletePolicyByEmailId(String emailId) {
		
		Policy policy = getPolicyByEmailId(emailId);
		if(policy == null)
			throw new InvalidPolicyNumberException("No such policy exists");
		
		policyRepository.deleteById(emailId);
		return policy;
	}
	
	public Policy updatePolicy(String emailId, Policy policy) {
		
		if(!checkPolicyNumber(policy.getPolicyNumber()))
			throw new InvalidPolicyNumberException(INVALID_POLICY_NUMBER_FORMAT_MESSAGE);
		
		if(policy.getMaximumAmount() <= 0)
			throw new InvalidAmountException("[!] Amount should be greater than 0");
		
		Policy oldPolicy = getPolicyByEmailId(emailId);
		if(oldPolicy == null)
			throw new InvalidPolicyNumberException("[!] No such policy exists");
		
		BeanUtils.copyProperties(policy, oldPolicy, "emailId");
		policyRepository.saveAndFlush(oldPolicy);
		return oldPolicy;
	}
}