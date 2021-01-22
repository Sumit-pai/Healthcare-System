package com.healthcaresystem.healthcaresystem.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
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

import com.healthcaresystem.healthcaresystem.exceptions.InvalidMedicalFeeException;
import com.healthcaresystem.healthcaresystem.model.Finance;
import com.healthcaresystem.healthcaresystem.model.Policy;
import com.healthcaresystem.healthcaresystem.model.Treatment;
import com.healthcaresystem.healthcaresystem.repository.PolicyRepository;
import com.healthcaresystem.healthcaresystem.repository.TreatmentRepo;
import com.healthcaresystem.healthcaresystem.service.FinanceService;
class Message1{
	String text;
	List<Finance> finances;
	public Message1(String text) {
		super();
		this.text = text;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public List<Finance> getFinances() {
		return finances;
	}

	public void setFinances(List<Finance> finances) {
		this.finances = finances;
	}
}
@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/healthcaresystem")
public class FinanceController {
	
	
	Logger logger = (Logger) LoggerFactory.getLogger(FinanceController.class);
	@Autowired
	private FinanceService financeService;
	@Autowired
	private PolicyRepository policyrepo;
	@Autowired
	private TreatmentRepo treatmentrepo;
	
	@GetMapping("/")
	public List<Finance> getAllUser() {
		return financeService.findAll();
	}
	
	@GetMapping("/getById/{id}")
	public ResponseEntity<Finance> getFinanceById(@PathVariable ("id") int id) {
	Finance optionalFinance = financeService.findByFinanceId(id);
	logger.info("getById method is accesed");
		return new ResponseEntity<>(optionalFinance, HttpStatus.OK);
	}

	@PostMapping("/")
	public Message1 addFinance(@RequestBody Finance finance)
	{
		Policy policy=policyrepo.findByPolicyNumber(finance.getPolicyNumber());
		Treatment treatment=treatmentrepo.getOne(finance.getTreatmentId());
		if(policy == null) {
			finance.setTotal(finance.getMedicalFee()+finance.getRegistrationFee()+treatment.getConsultancyFees());
		}
		else {
		if(finance.getMedicalFee()<=0)
			throw new InvalidMedicalFeeException("Medical Fee cannot be Negative");
		double amount=0;
//		amount=(finance.getMedicalFee()+finance.getRegistrationFee()+treatment.getConsultancyFees()-policy.getMaximumAmount());
		amount=(finance.getMedicalFee()+finance.getRegistrationFee()+treatment.getConsultancyFees());
		if(policy.getMaximumAmount()<amount)
			finance.setTotal(amount-policy.getMaximumAmount());
		else
			finance.setTotal(treatment.getConsultancyFees());
		}
		Finance finance1=financeService.add(finance);
		logger.info("finance added");
		return new Message1("Finance added Sucessfully!!");
	}
	
	@DeleteMapping("/{id}")
	public Message1 deleteUser(@PathVariable("id") int id)
	{
		financeService.deleteById(id);
		Message1 message=new Message1("Finance Succesfully Deleted");
		List<Finance> finances=financeService.findAll();
		message.setFinances(finances);
		return message;
	}
	@PutMapping("/update/{id}")
	public ResponseEntity<Finance>update(@PathVariable int id,@RequestBody Finance financeDetails)
	{
		Finance finance=financeService.findByFinanceId(id);
		finance.setEmail(financeDetails.getEmail());
		finance.setTreatmentId(financeDetails.getTreatmentId());
		finance.setPolicyNumber(financeDetails.getPolicyNumber());
		Finance updatedFinance=financeService.update(finance);
		return ResponseEntity.ok(updatedFinance);
	}
	
	@GetMapping("/bydate")
	public ResponseEntity<List<Finance>> getFinanceByDate(@RequestParam("date") @DateTimeFormat(iso=ISO.DATE) LocalDate createdTime)
	{
		logger.info("retrived the finance by particular date");
		return new ResponseEntity<>(financeService.getFinanceByDate(createdTime),HttpStatus.OK);
	}
	
}