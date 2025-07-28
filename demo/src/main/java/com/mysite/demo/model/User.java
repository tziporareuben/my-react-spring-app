

package com.mysite.demo.model;
import lombok.Data;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "users") 

@Data
public class User {
    @Id
    @GeneratedValue
    //  @Column
     private int id; 
     @Column(unique = true)
     private String email;
     @Column
     private String name;
     @Column
     private String phone;
     @Column
     private String password;
    @Column
     private int role;
    @OneToMany(mappedBy = "author")
     private List<Article> articles;
    @OneToMany(mappedBy = "user")
    private List<Review> reviews;

}


