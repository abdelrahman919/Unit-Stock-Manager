package com.hamada.UnitStockManager.controller;

import com.hamada.UnitStockManager.model.Drug;
import com.hamada.UnitStockManager.service.DrugService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.LifecycleState;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/drugs")
public class DrugsController {

    private final DrugService drugService;
    private static Path path = Path.of(".", "drugs.txt");


    @GetMapping
    public List<Drug> getAllDrugs() {
        return drugService.getAllDrugs();
    }



    @PostMapping
    public ResponseEntity<?> saveDrug(@RequestBody Drug drug) {
        drugService.saveDrug(drug);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAllDrugs() {
        drugService.deleteAllDrugs();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/file")
    public void saveToFile() {
        List<Drug> allDrugs = drugService.getAllDrugs();
        try {
            Files.writeString(path, allDrugs.toString(), StandardOpenOption.WRITE);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }



}