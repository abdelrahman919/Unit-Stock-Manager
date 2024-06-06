package com.hamada.UnitStockManager.controller;

import com.hamada.UnitStockManager.model.DrugCounter;
import com.hamada.UnitStockManager.service.DrugCounterService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dc")
public class DrugCounterController {

    private final DrugCounterService drugCounterService;

    @GetMapping("/f")
    public DrugCounter findIfExist(@RequestBody DrugCounter drugCounter) {
        return drugCounterService.findDCIfExists(drugCounter)
                .orElseThrow(EntityNotFoundException::new);
    }

    @GetMapping
    public List<DrugCounter> findAll() {
        return drugCounterService.getAllDCs();
    }



}
