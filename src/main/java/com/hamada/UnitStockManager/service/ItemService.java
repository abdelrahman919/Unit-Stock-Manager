package com.hamada.UnitStockManager.service;

import com.hamada.UnitStockManager.model.Item;
import com.hamada.UnitStockManager.repo.ItemRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepo itemRepo;
    private ModelMapper modelMapper;

    public List<Item> findItemsByDate(LocalDate date) {
        return itemRepo.findAllBySaveDate(date);
    }

    @Transactional
    public List<Item> getItemsByMonthAndYear(int month, int year) {
        return itemRepo.findByMonthAndYear(month, year);
    }

    public void saveItem(Item item) {
        itemRepo.save(item);
    }

//    public Item convertMapToItem(Map<String, Integer> map) {
//        map.entrySet().stream()
//                .map(entry ->{
//                    if (entry.getKey().toLowerCase().contains("tab")
//                            ||entry.getKey().toLowerCase().contains("cap")) {
//
//                    }
//                });
//
//    }

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
