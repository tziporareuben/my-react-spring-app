package com.mysite.demo.service;
import java.util.List;

import com.mysite.demo.dto.ReviewDTO;

public interface ReviewService {
      void add(ReviewDTO a);
    void update(ReviewDTO a);
    void deleteById(int id);
    List<ReviewDTO> getAll();
    ReviewDTO getById(int id);
    List<ReviewDTO> getByArticleId(int articleId);
    // List<String> getAllReviewByUserName(String uname);
    // List<String> getAllReviewByArticle(String aname);

}



