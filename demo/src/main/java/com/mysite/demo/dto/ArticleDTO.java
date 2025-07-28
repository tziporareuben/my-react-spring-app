package com.mysite.demo.dto;
import java.time.LocalDateTime;

import com.mysite.demo.model.Status;

import lombok.Data;
@Data
public class ArticleDTO {
 
     private int id; 
     private String title;
     private String subtitle;
     private String content;
     private int categoryid;
     private String categoryname;
     private String image;
     private int authorId;
     private String authorName;
     private LocalDateTime  datePublished; 
      private LocalDateTime  dateApproved;
     private LocalDateTime  dateUpdate;
    private int views;
      private String status;
}
