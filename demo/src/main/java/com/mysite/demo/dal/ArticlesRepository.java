package com.mysite.demo.dal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.mysite.demo.model.Article;
import com.mysite.demo.model.Status;

import java.util.List;
import org.springframework.data.domain.Pageable;

@Repository

public interface ArticlesRepository extends CrudRepository<Article, Integer> {
    public Article findByTitle(String title );
List<Article> findByCategory_NameAndStatus(String categoryName, Status status);
List<Article> findByStatusOrderByViewsDesc(Status status, Pageable pageable);
    Article findTopByOrderByDatePublishedDesc();
Article findTopByOrderByDateApprovedDesc();
  //  List<Article> findTop5ByOrderByViewsDesc();
       List<Article> findAllByOrderByViewsDesc(Pageable pageable);
    public List<Article> findByStatus(Status s);
    List<Article> findByStatus(Status status, Pageable pageable);
List<Article> findByTitleContainingIgnoreCaseAndStatus(String titlePart, Status status);

}






