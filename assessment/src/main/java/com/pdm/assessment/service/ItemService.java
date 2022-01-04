package com.pdm.assessment.service;

import com.pdm.assessment.model.Item;

import java.util.List;

public interface ItemService {
    public Item saveItem(Item item);
    public List<Item> getAllItems(String keyword, Float priceMin, Float priceMax);
    public Item getItem(Integer id);
    public void deleteItem(Integer id);
}
