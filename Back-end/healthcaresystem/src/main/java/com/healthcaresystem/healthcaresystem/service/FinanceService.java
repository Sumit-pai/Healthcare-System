package com.healthcaresystem.healthcaresystem.service;

import java.time.LocalDate;
import java.util.List;

import com.healthcaresystem.healthcaresystem.model.Finance;

public interface FinanceService {
	public List<Finance> findAll();
	public Finance add(Finance entity);
	public Finance update(Finance entity);
	public Finance findByFinanceId(int id);
	public void deleteById(int id);
	public List<Finance> getFinanceByDate(LocalDate parse);
}
