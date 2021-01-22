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

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="admin")

@EntityListeners(AuditingEntityListener.class)

@JsonIgnoreProperties(
        value = {"createdAt", "updatedAt"},
        allowGetters = true
        )
public class Admin {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int adminId;
	
//	LocalDateTime createdTime;
//	LocalDateTime updatedTime;
	
	//@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
	Date createdTime;
	
	//@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = false)
    @LastModifiedDate
	Date updatedTime;
	
	@OneToOne(cascade = CascadeType.ALL)
	User user;
	
	public Admin() {
		
	}
	public Admin(User user) {
		super();
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
	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public int getAdminId() {
		return adminId;
	}
	
	
}
