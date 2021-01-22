package com.healthcaresystem.healthcaresystem.model;

import java.time.LocalTime;
import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

public class UpdateDoctorRegistration {

	
	@NotNull
	@NotBlank
	private String specialization;
	
	@NotNull
	@NotBlank
	private String qualification;
	
	@NotNull
	@DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	private LocalTime inTime;
	
	@NotNull
	@DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	private LocalTime outTime;
	
	@Min(0)
	private int experience;
	
	
	
	
	
	public UpdateDoctorRegistration(String specialization, String qualification, LocalTime inTime, LocalTime outTime,
			int experience) {
		this.specialization = specialization;
		this.qualification = qualification;
		this.inTime = inTime;
		this.outTime = outTime;
		this.experience = experience;
		
	}
	
	

	public String getSpecialization() {
		return specialization;
	}
	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public LocalTime getInTime() {
		return inTime;
	}
	public void setInTime(LocalTime inTime) {
		this.inTime = inTime;
	}
	public LocalTime getOutTime() {
		return outTime;
	}
	public void setOutTime(LocalTime outTime) {
		this.outTime = outTime;
	}
	public int getExperience() {
		return experience;
	}
	public void setExperience(int experience) {
		this.experience = experience;
	}
	
}
