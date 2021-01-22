package com.healthcaresystem.healthcaresystem.model;

//import java.time.LocalDateTime;
import java.time.LocalTime;
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
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity(name="Appointment")
@Table(name="Appointment")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"createdAt", "updatedAt"},
        allowGetters = true
)
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int appointmentId;
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="doctor_id")
	private int doctorId;
	
	@Column(name="timings")
	private LocalTime timings;
	
	 @Column(name="doctor_name")
	 private String doctorName;
	
	 @Column(name = "created_at", nullable = false, updatable = false)
	 @CreatedDate
	 Date createdTime;
		
	 @Column(name = "updated_at", nullable = false)
	 @LastModifiedDate
	 Date updatedTime;

	public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public Appointment(int patientId, int doctorId, LocalTime timings, String doctorName, Date createdTime,
			Date updatedTime) {
		super();
		this.patientId = patientId;
		this.doctorId = doctorId;
		this.timings = timings;
		this.doctorName = doctorName;
		this.createdTime = createdTime;
		this.updatedTime = updatedTime;
	}



	public int getAppointmentId() {
		return appointmentId;
	}



	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}



	public int getPatientId() {
		return patientId;
	}



	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}



	public int getDoctorId() {
		return doctorId;
	}

   

	public String getDoctorName() {
		return doctorName;
	}



	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}



	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}



	public LocalTime getTimings() {
		return timings;
	}



	public void setTimings(LocalTime timings) {
		this.timings = timings;
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



	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}



	
	
	

	
}
