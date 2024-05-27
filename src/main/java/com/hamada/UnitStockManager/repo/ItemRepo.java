package com.hamada.UnitStockManager.repo;

import com.hamada.UnitStockManager.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ItemRepo extends JpaRepository<Item, Long> {

    List<Item> findAllBySaveDate(LocalDate date);

    @Query("SELECT i FROM Item i WHERE FUNCTION('MONTH', i.saveDate) = :month AND FUNCTION('YEAR', i.saveDate) = :year")
    List<Item> findByMonthAndYear(@Param("month") int month, @Param("year") int year);


}
