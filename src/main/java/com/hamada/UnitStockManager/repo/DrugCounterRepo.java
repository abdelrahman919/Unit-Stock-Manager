package com.hamada.UnitStockManager.repo;

import com.hamada.UnitStockManager.model.DrugCounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrugCounterRepo extends JpaRepository<DrugCounter, Long> {

}
