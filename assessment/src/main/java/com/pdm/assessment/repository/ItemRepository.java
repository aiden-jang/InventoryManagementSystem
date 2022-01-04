package com.pdm.assessment.repository;

import com.pdm.assessment.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item,Integer> {
    @Query("SELECT i FROM Item i WHERE" +
            "(CONCAT(i.name, ' ', i.brand, ' ', i.category, ' ', i.subcategory) LIKE %?1%) AND" +
            "(i.price >= ?2 OR ?2 IS NULL) AND" +
            "(i.price <= ?3 OR ?3 IS NULL)")
    public List<Item> searchWithKeyword(String keyword, Float priceMin, Float priceMax);

    @Query("SELECT i FROM Item i WHERE" +
            "(i.price >= ?1 OR ?1 IS NULL) AND" +
            "(i.price <= ?2 OR ?2 IS NULL)")
    public List<Item> searchWithoutKeyword(Float priceMin, Float priceMax);
}
