package com.mysite.demo.model;
import lombok.Data;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "articles")
@Data
public class Article {
    @Id
    @GeneratedValue
     private int id; 
     @Column
     private String title;
     @Column
     private String subtitle;
     @Column(name = "content", columnDefinition = "TEXT")
     private String content;
      @Column
    private int categoryid; 
     @ManyToOne
    @JoinColumn(name = "categoryid",insertable = false,updatable = false)
    @JsonIgnore
     private Category category;
     @Column
     private String image;
    @Column
     private int authorId;
    @ManyToOne
    @JoinColumn(name = "authorId",insertable = false,updatable = false)
    private User author;
    @Column
     private LocalDateTime  datePublished;
      @Column
     private LocalDateTime  dateApproved;
      @Column
     private LocalDateTime  dateUpdate;
      @Column
     private int  views;
     @Enumerated(EnumType.STRING)
   @Column(nullable = false)
    private Status status;
    @OneToMany(mappedBy = "article")
    private List<Review> reviews;
}





