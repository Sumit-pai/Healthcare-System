package com.healthcaresystem.healthcaresystem.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="patient")
@EntityListeners(AuditingEntityListener.class)
public class PatientRegistration {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="patient_id")
	int patientId;
	
	@NotNull
	@NotBlank
	@Column(name="blood_group")
	String bloodGroup;
	
	@NotNull
	@NotBlank
	@Column(name="medication")
	String medication;
	
	@NotNull
	@NotBlank
	@Column(name="policy_number")
	String policyNumber;
	
	@NotNull
	@Column(name="allergies")
	String allergies;
	
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
	Date createdTime;
	
    @Column(name = "updated_at", nullable = false)
    @LastModifiedDate
	Date updatedTime;
	

	@OneToOne(cascade = CascadeType.ALL)
	User user;
	
	public PatientRegistration() {
		
	}
	
	public PatientRegistration(String bloodGroup, String medication, String allergies, String policyNumber,User user) {
		super();
		this.bloodGroup = bloodGroup;
		this.medication = medication;
		this.allergies = allergies;
		this.policyNumber = policyNumber; 
		this.user = user;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public Date getUpdatedTime() {
		return updatedTime;
	}
	public void setUpdatedTime(Date  updatedTime) {
		this.updatedTime = updatedTime;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public String getMedication() {
		return medication;
	}
	public void setMedication(String medication) {
		this.medication = medication;
	}
	public String getAllergies() {
		return allergies;
	}
	public void setAllergies(String allergies) {
		this.allergies = allergies;
	}

	public String getPolicyNumber() {
		return policyNumber;
	}

	public void setPolicyNumber(String policyNumber) {
		this.policyNumber = policyNumber;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public int getPatientId() {
		return patientId;
	}

	


	@Override
	public String toString() {
		return "PatientRegistration [patientId=" + patientId + ", bloodGroup=" + bloodGroup + ", medication="
				+ medication + ", allergies=" + allergies + ", policyNumber=" + policyNumber + ", createdTime=" + createdTime
				+ ", updatedTime=" + updatedTime + "]";
	}
	
}
