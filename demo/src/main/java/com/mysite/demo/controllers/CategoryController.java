package com.mysite.demo.controllers;

import com.mysite.demo.dto.CategoryDTO;
import com.mysite.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/categories")
public class CategoryController {

    // @Autowired
    // private CategoryRepository categoryRepo;

    // @Autowired
    // private ModelMapper modelMapper;
    @Autowired

    private CategoryService service;

    @GetMapping("getall")
    public List<CategoryDTO> getAllCategories() {
        return service.getAll();

    }
}