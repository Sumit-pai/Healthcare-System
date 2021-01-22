//package com.cpg.entities;
package com.healthcaresystem.healthcaresystem.model;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



@Entity(name="doctor")
@Table(name = "doctor")
@EntityListeners(AuditingEntityListener.class)

public class DocRegistration{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int doctorId;
	
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
	@NotNull
	private int experience;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
	private Date createdTime;
	
    @Column(name = "updated_at")
    @LastModifiedDate
	private Date updatedTime;
	
	@OneToOne(cascade = CascadeType.ALL)
	private User user;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<SlotsAvailable> slots;
	
	public DocRegistration() {
		
	}

	public DocRegistration(String specialization, String qualification, int experience,Date createdTime,Date updatedTime, User user) {
		super();
		this.specialization = specialization;
		this.qualification = qualification;
		this.experience = experience;
		this.createdTime = createdTime;
		this.updatedTime = updatedTime;
		this.user = user;
	}

	public List<SlotsAvailable> getSlots() {
		return slots;
	}

	public void setSlots(List<SlotsAvailable> slots) {
		this.slots = slots;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "DocRegistration [doctorId=" + doctorId + ", specialization=" + specialization + ", Qualification="
				+ qualification + ", In_Time=" + inTime + ", Out_Time=" + outTime + ", Experience=" + experience + ", createdTime=" + createdTime
				+ ", updatedTime=" + updatedTime + "]";
	}
}