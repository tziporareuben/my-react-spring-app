package com.mysite.demo.dal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.mysite.demo.model.Review;
import java.util.List;

@Repository

public interface ReviewRepository extends CrudRepository<Review, Integer>{
        public Review findByid(int id );
      public List<Review> findByArticleId(int articleId);

}


