

package com.mysite.demo.service;

import java.util.List;

import com.mysite.demo.dto.UserDTO;

public interface UserService {
    void add(UserDTO u);
    void update(UserDTO u);
    void deleteById(int id);
    List<UserDTO> getAll();
    UserDTO getById(int id);
    UserDTO getByEmail(String email);
    void adminChangeRole(int id, UserDTO u);
 UserDTO logIn(String email, String password);
    // void signUp(String name, String email, String phone, String password, int role);
    void signUp(UserDTO u);
    // void logIn(String email, String password);
}
