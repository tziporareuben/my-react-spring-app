package com.mysite.demo.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;  
import com.google.gson.reflect.TypeToken;
import com.mysite.demo.model.Article;
import com.mysite.demo.model.User;

import com.mysite.demo.model.Category;
import com.mysite.demo.model.Status;
import com.mysite.demo.dal.ArticlesRepository;
import com.mysite.demo.dal.CategoryRepository;
import com.mysite.demo.dal.UserRepository;
import com.mysite.demo.dto.ArticleDTO;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service

public class ArticlesServiceImpl implements ArticleService{
   
    
@Autowired
private ArticlesRepository articleRep;
@Autowired
private CategoryRepository categoryRep;

@Autowired
private ModelMapper mapper;
// @Override
// public void add(ArticleDTO a) {
// if (articleRep.existsById(a.getId()))
//    throw new RuntimeException("the key:" + a.getId() + " exists in db!!!");
// articleRep.save(mapper.map(a,Article.class));
// }

@Override
public void add(ArticleDTO dto) {

    if (articleRep.existsById(dto.getId())) {
        throw new RuntimeException("The key: " + dto.getId() + " exists in DB!");
    }

    // טיפול בקטגוריה
    Category category = categoryRep.findByName(dto.getCategoryname());
    if (category == null) {
        category = new Category();
        category.setName(dto.getCategoryname());
        category = categoryRep.save(category);
    }

    // עדכון הנתונים ב־DTO לשיוך נכון
    dto.setCategoryid(category.getCode());
    dto.setCategoryname(category.getName());

    // מיפוי ושמירה
    Article article = mapper.map(dto, Article.class);

    // חשוב: הגדרת הקטגוריה שנשמרה למקרה שהמיפוי לא עשה זאת
    article.setCategory(category);

    // אפשר גם לוודא שיוך מחבר – אם צריך
    // User author = userRep.findById(dto.getAuthorId())
    //     .orElseThrow(() -> new RuntimeException("Author not found"));
    // article.setAuthor(author);

    articleRep.save(article);
}




@Override
public void update(ArticleDTO a) {
if (!articleRep.existsById(a.getId())){
    throw new RuntimeException("the key:" + a.getId() + " does not exist in db!!!");}
Category category = categoryRep.findByName(a.getCategoryname());
    if (category == null) {
        category = new Category();
        category.setName(a.getCategoryname());
        category = categoryRep.save(category);
    }
a.setCategoryid(category.getCode());
a.setCategoryname(category.getName());
// articleRep.save(mapper.map(a,Article.class));
  Article article = mapper.map(a, Article.class);

    // חשוב: הגדרת הקטגוריה שנשמרה למקרה שהמיפוי לא עשה זאת
    article.setCategory(category);

    articleRep.save(article);
}
@Override
public void deleteById(int id) {
articleRep.deleteById(id);
}
public List<ArticleDTO> searchByTitle(String query) {
    Status approvedStatus = Status.APPROVED;
    List<Article> articles = articleRep.findByTitleContainingIgnoreCaseAndStatus(query, approvedStatus);
    return articles.stream().map(this::toDTO).collect(Collectors.toList());
}
public List<ArticleDTO>filterArticles(Status status,Pageable pageable)
{
      List<Article> articles = articleRep.findByStatus(status, pageable);
    return articles.stream().map(this::toDTO).collect(Collectors.toList());
}
// @Override
// public List<ArticleDTO> getAll() {
//     Type t=new TypeToken<List<ArticleDTO>>(){}.getType();
// return mapper.map((List<Article>)articleRep.findAll(),t) ;
// }
// @Override
// public ArticleDTO getById(int id){
//     return mapper.map(articleRep.findById(id).get(), ArticleDTO.class);
// }

public ArticleDTO toDTO(Article article) {
    ArticleDTO dto = new ArticleDTO();
    BeanUtils.copyProperties(article, dto); // או להשתמש ב-ModelMapper כאן אם מתאים

    if (article.getCategory() != null) {
        dto.setCategoryid(article.getCategory().getCode());  // שים לב, בקטגוריה יש לך שדה code ולא id
        dto.setCategoryname(article.getCategory().getName());
    }

    if (article.getAuthor() != null) {
        dto.setAuthorId(article.getAuthor().getId());
        dto.setAuthorName(article.getAuthor().getName());
    }
    dto.setStatus(article.getStatus().toString());
    return dto;
}

@Override
public ArticleDTO getById(int id) {
    Article article = articleRep.findById(id).orElseThrow(() -> new RuntimeException("לא נמצא מאמר"));
    return toDTO(article);
}

@Override
public List<ArticleDTO> getAll() {
    List<Article> articles = (List<Article>) articleRep.findAll();
    return articles.stream().map(this::toDTO).collect(Collectors.toList());
}

@Override
public List<String> getAllArticlesByCategoryName(String cname)
{
    return categoryRep.findByName(cname).getArticles().stream().map(Article::getTitle).toList();
}
// @Override
// public   List<String> getAllArticlesByUserName(String uname)
// {
//     return userRep.findByName(uname).getArticles().stream().map(Article::getTitle).toList();
// }

// @Override
// public List<ArticleDTO> GetAllArticlesByCategoryName(String cname) {
//     List<Article> articles = articleRep.findByCategory_Name(cname);
//     Type listType = new TypeToken<List<ArticleDTO>>() {}.getType();
//     return mapper.map(articles, listType);
// }
@Override
public List<ArticleDTO> GetAllArticlesByCategoryName(String cname) {
    List<Article> articles = articleRep.findByCategory_NameAndStatus(cname, Status.APPROVED);

    return articles.stream()
        .map(this::toDTO)
        .collect(Collectors.toList());
}


@Override
public ArticleDTO getLatestArticle() {
    Article latest = articleRep.findTopByOrderByDateApprovedDesc();
    // return mapper.map(latest, ArticleDTO.class);
        return toDTO(latest);

}
// @Override
// public List<ArticleDTO> getTopViewedArticles() {
//     List<Article> top = articleRep.findTop5ByOrderByViewsDesc();
//     Type listType = new TypeToken<List<ArticleDTO>>() {}.getType();
//     return mapper.map(top, listType);
// }
@Override
public List<ArticleDTO> getTopViewedArticles(int count) {
    List<Article> toparticles = articleRep.findByStatusOrderByViewsDesc(Status.APPROVED, PageRequest.of(0, count));

    return toparticles.stream()
        .map(this::toDTO)
        .collect(Collectors.toList());
}

// @Override
// public List<ArticleDTO> getTopViewedArticles(int count) {

//    List<Article> toparticles = articleRep.findAllByOrderByViewsDesc(PageRequest.of(0, count));
//     // Type listType = new TypeToken<List<ArticleDTO>>() {}.getType();
//     // return mapper.map(toparticles, listType);
//    toparticles = articleRep.findByStatus(Status.APPROVED);

//        List<ArticleDTO> dtos = toparticles.stream()
//         .map(this::toDTO)
//         .collect(Collectors.toList());
//     return dtos;
// }
@Override
public void updateViews(int id, int views) {
    Article art = articleRep.findById(id).orElseThrow(() -> new RuntimeException("לא נמצא"));
    art.setViews(views);
    articleRep.save(art);
}
@Override
public List<ArticleDTO> getByStatus(Status s)
{
    List<Article> articles = articleRep.findByStatus(s);
    // Type listType = new TypeToken<List<ArticleDTO>>() {}.getType();
    // return mapper.map(articles, listType);

        List<ArticleDTO> dtos = articles.stream()
        .map(this::toDTO)
        .collect(Collectors.toList());
    return dtos;
}
// @Override
// public List<Article> getByStatus(Status status) {
//         return articleRep.findByStatus(status);
//     }
@Override
public void updateStatus(int id, Status status) 
{
    Article article = articleRep.findById(id)
            .orElseThrow(() -> new RuntimeException("Article not found with id " + id));
    
        article.setStatus(status);
   if (status == Status.APPROVED) {
        article.setDateApproved(LocalDateTime.now(ZoneId.of("Asia/Jerusalem")));
}
        articleRep.save(article);
    }
}






