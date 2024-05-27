package com.hamada.UnitStockManager.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Item {
    @Id
    @GeneratedValue(generator = "itemIdGen", strategy = GenerationType.IDENTITY)
    @SequenceGenerator(allocationSize = 1, name = "itemIdGen")
    private Long id;
    @ManyToOne
    private Drug drug;
    private int count;
    private LocalDate saveDate;


}
