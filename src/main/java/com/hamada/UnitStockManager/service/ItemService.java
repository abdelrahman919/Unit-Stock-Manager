package com.hamada.UnitStockManager.service;

import com.hamada.UnitStockManager.model.DrugCounter;
import com.hamada.UnitStockManager.model.Item;
import com.hamada.UnitStockManager.repo.DrugCounterRepo;
import com.hamada.UnitStockManager.repo.ItemRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepo itemRepo;
    private final DrugCounterRepo drugCounterRepo;
    private ModelMapper modelMapper;

    public List<Item> getAllItems() {
        return itemRepo.findAll();
    }

    public List<Item> findItemsByDate(LocalDate date) {
        return itemRepo.findAllBySaveDate(date);
    }

    @Transactional
    public List<Item> getItemsByMonthAndYear(int month, int year) {
        return itemRepo.findByMonthAndYear(month, year);
    }

    public void saveItem(Item item) {
        List<DrugCounter> updatedList = item.getDrugCounterList().stream().map(drugCounter -> {
            Optional<DrugCounter> dcOptional = drugCounterRepo
                    .findByDrugAndCounter(drugCounter.getDrug(),
                            drugCounter.getCounter());
            return dcOptional.orElse(drugCounter);
        }).toList();
        item.setDrugCounterList(updatedList);
        itemRepo.save(item);
    }


    public void deleteItem(Long id) {
        itemRepo.deleteById(id);
    }

    public Item updateItem(Item oldItem, Item newItem) {
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(newItem, oldItem);
        itemRepo.save(oldItem);
        return oldItem;
    }



}
