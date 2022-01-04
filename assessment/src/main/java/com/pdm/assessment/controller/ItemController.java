package com.pdm.assessment.controller;

import com.pdm.assessment.model.Item;
import com.pdm.assessment.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/items")
@CrossOrigin

public class ItemController {
    @Autowired
    private ItemService itemService;

    @PostMapping("/add")
    public String add(@RequestBody Item item) {
        itemService.saveItem(item);
        return "New item is added";
    }

    @GetMapping("/getAll")
    public List<Item> getAllItems(@Param("keyword") String keyword,
                                  @Param("priceMin") Float priceMin,
                                  @Param("priceMax") Float priceMax) {
        return itemService.getAllItems(keyword, priceMin, priceMax);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> get(@PathVariable Integer id) {
        try {
            Item item = itemService.getItem(id);
            return new ResponseEntity<Item>(item, HttpStatus.OK);
        } catch (NoSuchElementException e){
            return new ResponseEntity<Item>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@RequestBody Item item, @PathVariable Integer id) {
        try {
            Item existingItem = itemService.getItem(id);
            itemService.saveItem(item);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Item>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        itemService.deleteItem(id);
        return "Deleted " + id;
    }
}
