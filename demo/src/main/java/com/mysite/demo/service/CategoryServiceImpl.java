 package com.mysite.demo.service;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.mysite.demo.dal.CategoryRepository;
import com.mysite.demo.dto.CategoryDTO;
import com.mysite.demo.model.Category;
import com.google.gson.reflect.TypeToken;
@Service

public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRep;
    @Autowired
     private ModelMapper mapper;
    public   List<CategoryDTO> getAll()
    {

        Type t=new TypeToken<List<CategoryDTO>>(){}.getType();
        return mapper.map((List<Category>)categoryRep.findAll(),t) ;
        
    }

}