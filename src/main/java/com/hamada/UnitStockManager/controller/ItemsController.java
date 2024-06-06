package com.hamada.UnitStockManager.controller;

import com.hamada.UnitStockManager.model.Item;
import com.hamada.UnitStockManager.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemsController {

    private final ItemService itemService;

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }


    @PostMapping
    public ResponseEntity<?> saveItem(@RequestBody Item item) {
        System.out.println(item);
        itemService.saveItem(item);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

}
