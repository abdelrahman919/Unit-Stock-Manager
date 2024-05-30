package com.hamada.UnitStockManager.model;

import com.hamada.UnitStockManager.model.Drug;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DrugCounter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "DCGen")
    @SequenceGenerator(name = "DCGen", allocationSize = 1)
    private Long id;
    @ManyToOne
    private Drug drug;
    private int counter;
}
