package com.healthcaresystem.healthcaresystem.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthcaresystem.healthcaresystem.exceptions.InvalidPolicyNumberException;
import com.healthcaresystem.healthcaresystem.model.Policy;
import com.healthcaresystem.healthcaresystem.service.PolicyService;

import java.util.List;



 class PolicyMessage {

	private String message;
	private List<Policy> policies;
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public List<Policy> getPolicies() {
		return policies;
	}
	public void setPolicies(List<Policy> policies) {
		this.policies = policies;
	}	
}


@RestController
@RequestMapping("/policies")
@CrossOrigin("*")
public class PolicyController {

	private static final Logger logger = LoggerFactory.getLogger(PolicyController.class);
	
	@Autowired
	private PolicyService policyService;
	private PolicyMessage message;
	
	@GetMapping("/")
	public ResponseEntity<PolicyMessage> getAllPolicies(){
		message = new PolicyMessage();
		logger.trace("[+] getAllPolicies method accessed");
		List<Policy> policies = policyService.getAllPolicies();
		message.setMessage("List of policies");
		message.setPolicies(policies);
		return new ResponseEntity<>(message, HttpStatus.OK);
	}
	
	@GetMapping("/{emailId}")
	public ResponseEntity<PolicyMessage> getPolicyById(@PathVariable ("emailId") String emailId){
		List<Policy> policies = new ArrayList<>();
		message = new PolicyMessage();
		Policy policy = policyService.getPolicyByEmailId(emailId);
		
		if(policy == null || !policy.isActive())
			throw new InvalidPolicyNumberException("No such policy exists");
		
		message.setMessage("Policy for email Id " + emailId);
		policies.add(policy);
		message.setPolicies(policies);
		
		logger.trace("[+] Get policy by id method accessed");
		return new ResponseEntity<>(message, HttpStatus.OK);
	}
	
	@GetMapping("/search")
	public ResponseEntity<PolicyMessage> getPolicyByPolicyNumber(@RequestParam ("policyNumber") String policyNumber) {
		message = new PolicyMessage();
		List<Policy> policies = new ArrayList<>();
		Policy policy = policyService.getPolicyByPolicyNumber(policyNumber);
		if(policy == null || !policy.isActive())
			throw new InvalidPolicyNumberException("No such policy exists");
		
		policies.add(policy);
		message.setMessage("Policy details for policy number " + policyNumber);
		message.setPolicies(policies);
		
		logger.info("[+] Get policy by policyNumber method accessed");
		return new ResponseEntity<>(message, HttpStatus.OK);
	}
	
	@PostMapping("/")
	public ResponseEntity<PolicyMessage> addPolicy(@RequestBody Policy policy){
		message = new PolicyMessage();
		Policy existingPolicy = policyService.getPolicyByEmailId(policy.getEmailId());
		if(existingPolicy == null) {
			policyService.addPolicy(policy);
			List<Policy> policies = policyService.getAllPolicies();
			message.setMessage("Successfully added policy !");
			message.setPolicies(policies);
			return new ResponseEntity<>(message, HttpStatus.OK);
		}
		
		message.setMessage("Patient Id " + policy.getEmailId() + " already exists");
		message.setPolicies(policyService.getAllPolicies());
		logger.info("[+] Policy added successfully");
		return new ResponseEntity<>(message, HttpStatus.OK);
	}
	
	@DeleteMapping("/{emailId}")
	public ResponseEntity<PolicyMessage> deletePolicy(@PathVariable ("emailId") String emailId) {
		message = new PolicyMessage();
		
		Policy ifPolicyExists = policyService.getPolicyByEmailId(emailId);
		if(ifPolicyExists != null) {
			policyService.deletePolicyByEmailId(emailId);
			message.setMessage("Successfully deleted policy with patient id " + emailId);
			message.setPolicies(policyService.getAllPolicies());
			return new ResponseEntity<>(message, HttpStatus.OK);
		}
		
		message.setMessage("No such policy exists with email id " + emailId);
		message.setPolicies(policyService.getAllPolicies());
		logger.info("[+] Policy removed successfully");
		return new ResponseEntity<>(message, HttpStatus.OK);
	}
	
	@PutMapping("/{emailId}")
	public ResponseEntity<PolicyMessage> updatePolicy(@PathVariable ("emailId") String emailId, @RequestBody Policy policy) {
		message = new PolicyMessage();
		Policy policyExists = policyService.getPolicyByEmailId(emailId);
		if(policyExists != null && policyExists.isActive()) {
			policyService.updatePolicy(emailId, policy);
			message.setMessage("Successfully updated policy for email id " + emailId);
			message.setPolicies(policyService.getAllPolicies());
			return new ResponseEntity<>(message, HttpStatus.OK);
		}
		
		message.setMessage("No such policy exists for email id " + emailId);
		message.setPolicies(policyService.getAllPolicies());
		logger.info("[+] Policy information updated successfully");
		return new ResponseEntity<>(message, HttpStatus.OK);
	}
}