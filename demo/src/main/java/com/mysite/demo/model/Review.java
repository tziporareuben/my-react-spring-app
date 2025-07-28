package com.mysite.demo.model;
import lombok.Data;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "review")
@Data
public class Review {
    @Id
    @GeneratedValue
    //  @Column
     private int id; 
     @Column
     private int articleId;
     @ManyToOne
    @JoinColumn(name = "articleId",insertable = false,updatable = false)
     private Article article;
     @Column
     private int userId;
     @ManyToOne
    @JoinColumn(name = "userId",insertable = false,updatable = false)
     private User user;
     @Column
     private String comment;
    @Column
     private LocalDateTime  datePublished;
}



