package com.healthcaresystem.healthcaresystem.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="Finance")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"createdAt", "updatedAt"},
        allowGetters = true
)
public class Finance {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int financeId;
//	int patientId;
	String email;
	int treatmentId;
	double registrationFee;
	double medicalFee;
	double total;
	String policyNumber;
	 @Column(name = "createdAt", nullable = false, updatable = false)
	    @CreatedDate
		Date createdTime;
		
	    @Column(name = "updatedAt", nullable = false)
	    @LastModifiedDate
		Date updatedTime;
	public int getFinanceId()
	{
		return financeId;
	}
//	public int getPatientId() {
//		return patientId;
//	}
//	public void setPatientId(int patientId) {
//		this.patientId = patientId;
//	}
	
	public int getTreatmentId() {
		return treatmentId;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}


	public double getRegistrationFee() {
		return registrationFee;
	}


	public void setRegistrationFee(double registrationFee) {
		this.registrationFee = registrationFee;
	}


	public double getMedicalFee() {
		return medicalFee;
	}


	public void setMedicalFee(double medicalFee) {
		this.medicalFee = medicalFee;
	}


	public double getTotal() {
		return total;
	}


	public void setTotal(double total) {
		this.total = total;
	}


	public String getPolicyNumber() {
		return policyNumber;
	}


	public void setPolicyNumber(String policyNumber) {
		this.policyNumber = policyNumber;
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
	
	public Finance() {
		
	}
	
	public Finance(String email, int treatmentId, double registrationFee, double medicalFee, double total,
		String policyNumber) {
	super();
//	this.patientId = patientId;
	this.email=email;
	this.treatmentId = treatmentId;
	this.registrationFee = registrationFee;
	this.medicalFee = medicalFee;
	this.total = total;
	this.policyNumber = policyNumber;

}
	
}