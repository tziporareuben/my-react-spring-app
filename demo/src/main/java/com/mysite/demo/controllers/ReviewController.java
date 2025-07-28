package com.mysite.demo.controllers;

import com.mysite.demo.dto.ReviewDTO;
import com.mysite.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/reviews")
public class ReviewController {
@Autowired
private ReviewService service;


@PostMapping("add")
public void add(@RequestBody ReviewDTO a)
{
service.add(a);
}
@PutMapping
@RequestMapping("update/{id}")
public void update(@PathVariable int id, @RequestBody ReviewDTO a)
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
public List<ReviewDTO> getAll()
{
return service.getAll();
}
@GetMapping("byArticle/{articleId}")
public List<ReviewDTO> getByArticle(@PathVariable int articleId) {
    return service.getByArticleId(articleId);
}

}


