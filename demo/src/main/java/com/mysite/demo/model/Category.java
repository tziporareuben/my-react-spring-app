package com.mysite.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class Category {
    @Id
    @GeneratedValue
    private int code;
    @Column
    private String name;
    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Article> articles;
}
