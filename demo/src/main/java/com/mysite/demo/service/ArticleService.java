package com.mysite.demo.service;
import java.util.List;
import com.mysite.demo.model.Article;
import org.springframework.data.domain.Pageable;

import com.mysite.demo.dto.ArticleDTO;
import com.mysite.demo.model.Status;

public interface ArticleService {
    void add(ArticleDTO a);
    void update(ArticleDTO a);
    void deleteById(int id);
    List<ArticleDTO> getAll();
    ArticleDTO getById(int id);
     List<ArticleDTO> getByStatus(Status s);
    // List<Article> getByStatus(Status s);
    List<String> getAllArticlesByCategoryName(String cname);
        List<ArticleDTO> GetAllArticlesByCategoryName(String cname);
  ArticleDTO getLatestArticle();
List<ArticleDTO> getTopViewedArticles(int count);
// List<ArticleDTO> getTopViewedArticles();
    // List<String> getAllArticlesByUserName(String uname);
public void updateViews(int id, int views) ;
void updateStatus(int id, Status status) ;
 List<ArticleDTO>searchByTitle (String query);
 List<ArticleDTO>filterArticles(Status status,Pageable pageable);

}



