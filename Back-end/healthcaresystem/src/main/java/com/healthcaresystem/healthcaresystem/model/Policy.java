package com.healthcaresystem.healthcaresystem.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "policy")
public class Policy {

	@Id
	private String emailId;
	
	private String policyNumber;
	
	private double maximumAmount;
	
	private String diseaseCovered;
	
	private boolean active = true;


	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPolicyNumber() {
		return policyNumber;
	}

	public void setPolicyNumber(String policyNumber) {
		this.policyNumber = policyNumber;
	}

	public double getMaximumAmount() {
		return maximumAmount;
	}

	public void setMaximumAmount(double maximumAmount) {
		this.maximumAmount = maximumAmount;
	}

	public String getDiseaseCovered() {
		return diseaseCovered;
	}

	public void setDiseaseCovered(String diseaseCovered) {
		this.diseaseCovered = diseaseCovered;
	}
	
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}


	public Policy(int patientId, String policyNumber, double maximumAmount, String diseaseCovered) {
		super();
		this.policyNumber = policyNumber;
		this.maximumAmount = maximumAmount;
		this.diseaseCovered = diseaseCovered;
	}

	public Policy() {
		super();
	}

	@Override
	public String toString() {
		return "Policy [emailId=" + emailId + ", policyNumber=" + policyNumber + ", maximumAmount=" + maximumAmount
				+ ", diseaseCovered=" + diseaseCovered + ", active=" + active + "]";
	}	
	
}