package com.pdm.assessment.service;

import com.pdm.assessment.model.Item;
import com.pdm.assessment.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public List<Item> getAllItems(String keyword, Float priceMin, Float priceMax) {
        if (keyword == null && priceMin == null && priceMax == null) {
            return itemRepository.findAll();
        } else if (keyword != null) {
            return itemRepository.searchWithKeyword(keyword, priceMin, priceMax);
        }
        return itemRepository.searchWithoutKeyword(priceMin, priceMax);
    }

    @Override
    public Item getItem(Integer id) {
        return itemRepository.findById(id).get();
    }

    @Override
    public void deleteItem(Integer id) {
       itemRepository.deleteById(id);
    }
}
