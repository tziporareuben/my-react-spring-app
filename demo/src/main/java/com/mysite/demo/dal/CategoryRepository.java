package com.mysite.demo.dal;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.mysite.demo.model.Category;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer> {
    public Category findByName(String name);
}
