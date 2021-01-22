package com.healthcaresystem.healthcaresystem.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcaresystem.healthcaresystem.model.Finance;
import com.healthcaresystem.healthcaresystem.repository.FinanceRepository;

@Service
public class FinanceServiceImpl implements FinanceService{
	
	@Autowired
	private FinanceRepository financeRepository;
	@Override
	public Finance add(Finance finance) {
		return financeRepository.save(finance);
	}
	
	@Override
	public Finance update(Finance finance) {
		return financeRepository.save(finance);
	}
	
	@Override
	public List<Finance> findAll() {
		return financeRepository.findAll();
	}
	@Override
	public Finance findByFinanceId(int id) {
		return financeRepository.findByFinanceId(id);
	}
	@Override
	public void deleteById(int id) {
		financeRepository.deleteById(id);
	}

	@Override
	public List<Finance> getFinanceByDate(LocalDate date) {
		return financeRepository.findByCreatedTime(date);
	
	}
	
}
