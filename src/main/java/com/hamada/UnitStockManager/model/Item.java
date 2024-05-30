package com.hamada.UnitStockManager.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Item {
    @Id
    @GeneratedValue(generator = "itemIdGen", strategy = GenerationType.IDENTITY)
    @SequenceGenerator(allocationSize = 1, name = "itemIdGen")
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    private List<DrugCounter> drugCounterList;

    private LocalDate saveDate;


}
