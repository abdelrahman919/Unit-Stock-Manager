package com.hamada.UnitStockManager.service;

import com.hamada.UnitStockManager.model.Drug;
import com.hamada.UnitStockManager.repo.DrugRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrugService {

    private final DrugRepo drugRepo;

    public Drug findById(String nameId) {
        return drugRepo.findById(nameId)
                .orElseThrow(EntityNotFoundException::new);
    }

    public List<Drug> getAllDrugs() {
        return drugRepo.findAll();
    }

    public void saveDrug(Drug drug) {
        drugRepo.save(drug);
    }

    public void deleteDrug(Drug drug) {
        drugRepo.delete(drug);
    }

    public void deleteAllDrugs() {
        drugRepo.deleteAll();
    }





}
