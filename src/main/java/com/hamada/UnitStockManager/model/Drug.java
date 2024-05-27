package com.hamada.UnitStockManager.model;

import com.hamada.UnitStockManager.enums.DrugType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jdk.dynalink.StandardOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Drug {

    @Id
    private String name;

    @Enumerated(value = EnumType.STRING)
    private DrugType type;


}
