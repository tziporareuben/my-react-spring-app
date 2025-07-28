package com.mysite.demo.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import com.google.gson.reflect.TypeToken;
import com.mysite.demo.model.Article;
import com.mysite.demo.model.Review;
import java.lang.reflect.Type;

import com.mysite.demo.dal.ArticlesRepository;
import com.mysite.demo.dal.ReviewRepository;
import com.mysite.demo.dal.UserRepository;
import com.mysite.demo.dto.ArticleDTO;
import com.mysite.demo.dto.ReviewDTO;

@Service

public class ReviewServiceImpl implements ReviewService{
   
@Autowired
private ArticlesRepository articleRep;

@Autowired
private UserRepository userRep; 
@Autowired
private ReviewRepository reviewRep;
@Autowired
private ModelMapper mapper;

public ReviewDTO toDTO(Review review) {
    ReviewDTO dto = new ReviewDTO();
    BeanUtils.copyProperties(review, dto); // או להשתמש ב-ModelMapper כאן אם מתאים

    if (review.getArticle() != null) {
        dto.setArticleId(review.getArticle().getId()); 
    }

    if (review.getUser() != null) {
        dto.setUserId(review.getUser().getId());
        dto.setUsername(review.getUser().getName());
    }
    return dto;
}
@Override

public void add(ReviewDTO r) {
if (reviewRep.existsById(r.getId()))
     throw new RuntimeException("the key:" + r.getId() + " exists in db!!!");
reviewRep.save(mapper.map(r,Review.class));
}
@Override
public void update(ReviewDTO r) {
if (!reviewRep.existsById(r.getId()))
    throw new RuntimeException("the key:" + r.getId() + " does not exist in db!!!");
reviewRep.save(mapper.map(r,Review.class));
}
@Override
public void deleteById(int id) {
reviewRep.deleteById(id);
}
@Override
public List<ReviewDTO> getAll() {
        Type t=new TypeToken<List<ReviewDTO>>(){}.getType();
return mapper.map((List<Review>)reviewRep.findAll(),t);
}
@Override
public ReviewDTO getById(int id){
        return mapper.map(reviewRep.findById(id).get(), ReviewDTO.class);
 
}

@Override
public List<ReviewDTO> getByArticleId(int articleId) {
    List<Review> reviews = reviewRep.findByArticleId(articleId);
    // Type listType = new TypeToken<List<ReviewDTO>>() {}.getType();
    // return mapper.map(reviews, listType);


    
    List<ReviewDTO> dtos = reviews.stream()
        .map(this::toDTO)
        .collect(Collectors.toList());
    return dtos;
}
// @Override
// public List<String> getAllReviewByUserName(String uname)
//  {
//     return userRep.findByName(uname).getReviews().stream().map(Review::getComment).toList();

//  }
//  @Override
// public   List<String> getAllReviewByArticle(String aname)
//  {
// return articleRep.findByTitle(aname).getReviews().stream().map(Review::getComment).toList();
//  }

}
