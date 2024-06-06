package com.hamada.UnitStockManager.repo;

import com.hamada.UnitStockManager.model.Drug;
import com.hamada.UnitStockManager.model.DrugCounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DrugCounterRepo extends JpaRepository<DrugCounter, Long> {

    Optional<DrugCounter> findByDrugAndCounter(Drug drug, int counter);
}
