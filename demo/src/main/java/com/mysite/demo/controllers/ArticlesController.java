package com.mysite.demo.controllers;
import java.util.Map;
import com.mysite.demo.dto.ArticleDTO;
import com.mysite.demo.model.Article;
import com.mysite.demo.model.Status;
import com.mysite.demo.service.ArticleService;
import org.modelmapper.TypeToken;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.lang.reflect.Type;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/articles")
public class ArticlesController {
  
    
@Autowired

private ArticleService service;
@Autowired
private ModelMapper mapper;
@PostMapping("add")
public void add(@RequestBody ArticleDTO a)
{
  

service.add(a);
}
@PutMapping
@RequestMapping("update/{id}")
public void update(@PathVariable int id, @RequestBody ArticleDTO a)
{
service.update(a);
}
@DeleteMapping
@RequestMapping("delete/{id}")
public void delete(@PathVariable int id)
{
service.deleteById(id);
}
@GetMapping("getall")
public List<ArticleDTO> getAll()
{
return service.getAll();
}
// @GetMapping("getArticleByCategoryName/{categoryname}")
// public List<ArticleDTO> getArticleByCategory(@PathVariable String name)
// {
//     return service.GetAllArticlesByCategoryName(name);
// }
@GetMapping("getArticleByCategoryName/{categoryname}")
public List<ArticleDTO> getArticleByCategory(@PathVariable("categoryname") String categoryname) {
        System.out.println(categoryname);
    return service.GetAllArticlesByCategoryName(categoryname);
}
@GetMapping("getArticleByStatus/{statusName}")
public List<ArticleDTO> getArticleByStatus(@PathVariable("statusName") String statusName) {
      Status status = Status.valueOf(statusName.toUpperCase()); // להמיר ל-uppercase אם ENUM באותיות גדולות

    return service.getByStatus(status);
}
@GetMapping("/search")
public List<ArticleDTO> searchByTitle(@RequestParam("query") String query) {
    return service.searchByTitle(query);
    }
// @GetMapping("getArticleByStatus/{statusName}")
// public List<ArticleDTO> getArticleByStatus(@PathVariable String statusName) {
//     try {
//         Status status = Status.valueOf(statusName.toUpperCase()); // להמיר ל-uppercase אם ENUM באותיות גדולות
//         List<Article> articles = service.getByStatus(status);
//         Type listType = new TypeToken<List<ArticleDTO>>() {}.getType();
//         return mapper.map(articles, listType);
//     } catch (IllegalArgumentException e) {
//         throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status: " + statusName);
//     }
// }


@GetMapping("/{id}")
public ArticleDTO getById(@PathVariable int id) {
    return service.getById(id);
}
@PatchMapping("/{id}")
public void updateViews(@PathVariable int id, @RequestBody Map<String, Object> updates) {
    if (updates.containsKey("views")) {
        int views = (int) updates.get("views");
        service.updateViews(id, views);
    }
}

@GetMapping("/latest")
public ArticleDTO getLatestArticle() {
    return service.getLatestArticle();
}
// @GetMapping("/top-viewed")
// public List<ArticleDTO> getTopViewed() {
//     return service.getTopViewedArticles();
// }
@GetMapping("/top-viewed")
public List<ArticleDTO> getTop(@RequestParam(defaultValue = "5") int count) {
    return service.getTopViewedArticles(count);
}
@PutMapping("/update-status/{id}/{status}")
    public void updateStatus(@PathVariable int id, @PathVariable Status status) {
        service.updateStatus(id, status);
    }
@GetMapping("/filter")
public List<ArticleDTO> filterArticles(
        @RequestParam("status") Status status,
        @RequestParam(defaultValue = "dateApproved") String sortBy,
        @RequestParam(defaultValue = "desc") String direction
) {
    Sort sort = Sort.by(direction.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
    Pageable pageable = PageRequest.of(0, 1000, sort); // או כמה שתרצה
   return service. filterArticles( status, pageable);
}

}




