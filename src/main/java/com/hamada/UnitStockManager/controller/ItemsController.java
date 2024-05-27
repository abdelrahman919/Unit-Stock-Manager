package com.hamada.UnitStockManager.controller;

import com.hamada.UnitStockManager.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemsController {

    private final ItemService itemService;


//    @PostMapping
//    public ResponseEntity<?> saveItem(@RequestBody Map<String, Integer>) {
//        itemService.saveItem();
//    }

}
