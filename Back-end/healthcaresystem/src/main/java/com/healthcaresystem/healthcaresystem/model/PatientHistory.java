package com.healthcaresystem.healthcaresystem.model;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Table(name = "PatientHistory")
@Entity(name = "PatientHistory")
@Component
public class PatientHistory {

	
				@Id
				@GeneratedValue(strategy = GenerationType.AUTO)
				@Column(name = "patient_id")
				int patientId;
				
				@Column(name = "Symptoms")
				String Symptoms;
				
				@Column(name = "Reports")
				byte[]  Reports;
				
				@Column(name = "Detail_Description")
				String Detail_Description;
				
				@Column(name = "Doctor_Advice")
				String Doctor_Advice;
				
				@Column(name = "Diet")
				String Diet;
				
				
				
				
				public PatientHistory() {
					super();
				}
				public PatientHistory(int Patient_Id,String Symptoms,byte[] Reports,String Detail_Description,String Doctor_Advice,String Diet){
					super();
					this.patientId=patientId;
					this.Symptoms=Symptoms;
					this.Reports=Reports;
					this.Detail_Description=Detail_Description;
					this.Doctor_Advice=Doctor_Advice;
					this.Diet=Diet;
			
				}
				
				
				public int getPatientId() {
					return patientId;
				}
				public void setPatientId(int patientId) {
					this.patientId = patientId;
				}
				public String getSymptoms() {
					return Symptoms;
				}
				public void setSymptoms(String Symptoms) {
					this.Symptoms = Symptoms;
				}
				public byte[] getReports() {
					return Reports;
				}
				public void setReports(byte[] Reports) {
					this.Reports = Reports;
				}
				public  String getDetail_Description() {
					return Detail_Description;
				}
				public void setDetail_Description(String Detail_Description) {
					this.Detail_Description = Detail_Description;
				}
				public String getDoctor_Advice() {
					return Doctor_Advice;
				}
				public void setDoctor_Advice(String Doctor_Advice) {
					this.Doctor_Advice = Doctor_Advice;
				}
				public String getDiet() {
					return Diet;
				}
				public void setDiet(String Diet) {
					this.Diet = Diet;
				}
				@Override
				public String toString() {
					return "PatientHistory [patientId=" + patientId + ", Symptoms=" + Symptoms + ", Reports="
							+ Arrays.toString(Reports) + ", Detail_Description=" + Detail_Description
							+ ", Doctor_Advice=" + Doctor_Advice + ", Diet=" + Diet + "]";
				}
				
				
				
			}
