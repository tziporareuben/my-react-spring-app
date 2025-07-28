 package com.mysite.demo.dto;

import java.time.LocalDateTime;


import lombok.Data;

@Data
public class ReviewDTO {

     private int id; 
     private int articleId;
     private int userId;
     private String username;
     private String comment;
     private LocalDateTime  datePublished;
}