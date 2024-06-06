package com.hamada.UnitStockManager.service;

import com.hamada.UnitStockManager.model.DrugCounter;
import com.hamada.UnitStockManager.repo.DrugCounterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DrugCounterService {

    private final DrugCounterRepo drugCounterRepo;


    public Optional<DrugCounter> findDCIfExists(DrugCounter drugCounter) {
        return drugCounterRepo
                .findByDrugAndCounter(drugCounter.getDrug(), drugCounter.getCounter());
    }

    public List<DrugCounter> getAllDCs() {
        return drugCounterRepo.findAll();
    }

}
