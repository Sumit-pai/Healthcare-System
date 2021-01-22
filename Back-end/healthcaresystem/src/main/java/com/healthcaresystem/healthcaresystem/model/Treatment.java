package com.healthcaresystem.healthcaresystem.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Table(name="Treatment",uniqueConstraints= {@UniqueConstraint(columnNames={"appointment_id"})})
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Treatment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="treatment_id")
	private int treatmentId;
	
	@Min(1)
	@Column(name="appointment_id")
	private int appointmentId;
	
	@NotBlank(message = "Disease field is mandatory")
	@Column(name="disease")
	private String disease;
	
	@NotBlank(message = "Medicine field is mandatory")
	@Column(name="medicine")
	private String medicine;
	
	@Column(name="detail_description")
	private String detailDescription;
	
	@JsonIgnore
	@Column(name="report")
	private byte[] report;
	
	@DecimalMin("1.0")
	@Column(name="consultancy_fees")
	private double consultancyFees;
	

	@CreatedDate
	@Column(name="created_at", nullable = false, updatable = false)
	private Date createdAt;
	

	@LastModifiedDate
	@Column(name="updated_at", nullable = false)
	private Date updatedAt;	
	
	
	@Transient
	private String patientName;
	
	@Transient
	private String doctorName;
	
	//Constructors
	public Treatment() {}
	
	public Treatment(int appointmentId, String disease, String medicine, String detailDescription,
			double consultancyFees) {
		this.appointmentId = appointmentId;
		this.disease = disease;
		this.medicine = medicine;
		this.detailDescription = detailDescription;
		this.consultancyFees = consultancyFees;
	}
	
	public Treatment(int treatmentId, int appointmentId, String disease, String medicine,
			String detailDescription, double consultancyFees) {
		
		this(appointmentId,disease,medicine,detailDescription,consultancyFees);
		this.treatmentId = treatmentId;
	}
	
	
	//Getters & Setters

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getDisease() {
		return disease;
	}

	public void setDisease(String disease) {
		this.disease = disease;
	}

	public String getMedicine() {
		return medicine;
	}

	public void setMedicine(String medicine) {
		this.medicine = medicine;
	}

	public String getDetailDescription() {
		return detailDescription;
	}

	public void setDetailDescription(String detailDescription) {
		this.detailDescription = detailDescription;
	}

	public byte[] getReport() {
		return report;
	}

	public void setReport(byte[] report) {
		this.report = report;
	}

	public double getConsultancyFees() {
		return consultancyFees;
	}

	public void setConsultancyFees(double consultancyFees) {
		this.consultancyFees = consultancyFees;
	}
	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdat) {
		this.createdAt = createdat;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedat) {
		this.updatedAt = updatedat;
	}

	
	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	@Override
	public String toString() {
		return "CurrentTreatment [treatmentId=" + treatmentId + ", appointmentId=" + appointmentId + ", disease="
				+ disease + ", medicine=" + medicine + ", detailDescription=" + detailDescription 
				+ ", consultancyFees=" + consultancyFees + ", created_at="+createdAt + ", updated_at="+updatedAt +"]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + treatmentId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Treatment other = (Treatment) obj;
		if (appointmentId != other.appointmentId)
			return false;
		return true;
	}
	
	
	
	
}