
package com.mysite.demo.controllers;

import com.mysite.demo.dto.LoginRequestDTO;
import com.mysite.demo.dto.UserDTO;
import com.mysite.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/users")
public class UserController {
  
    
@Autowired

private UserService service;


@PostMapping("add")
public void add(@RequestBody UserDTO u)
{
service.add(u);
}
@PutMapping
@RequestMapping("update/{id}")
public void update(@PathVariable int id, @RequestBody UserDTO u)
{
service.update(u);
}
@DeleteMapping
@RequestMapping("delete/{id}")
public void delete(@PathVariable int id)
{
service.deleteById(id);
}
@GetMapping("getall")
public List<UserDTO> getAll()
{
return service.getAll();
}
@PostMapping("signup")
public void signUp(@RequestBody UserDTO u)
{
 System.out.println("Received signup request for email: " + u.getEmail());

service.signUp(u);
}
@PostMapping("login")
public UserDTO login(@RequestBody LoginRequestDTO loginRequest) {
    return service.logIn(loginRequest.getEmail(), loginRequest.getPassword());
}


@PutMapping("/admin-change-role/{id}")
public void adminChangeRole(@PathVariable int id, @RequestBody UserDTO u) {
    service.adminChangeRole(id, u);
}
@GetMapping("/{id}")
public UserDTO getById(@PathVariable int id) {
    return service.getById(id);
}
@GetMapping("/by-email")
public UserDTO getByEmail(@RequestParam String email) {
    return service.getByEmail(email);
}

}
