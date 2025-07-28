

package com.mysite.demo.service;
import java.lang.reflect.Type;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.mysite.demo.model.User;
import com.google.gson.reflect.TypeToken;
import com.mysite.demo.dal.UserRepository;
import com.mysite.demo.dto.UserDTO;

@Service

public class UserServiceImpl implements UserService{
   
    
@Autowired
private UserRepository userRep;
@Autowired
private ModelMapper mapper;
@Override
public void add(UserDTO u) {
    userRep.save(mapper.map(u, User.class));
}

@Override
public void update(UserDTO u) {
if (!userRep.existsById(u.getId()))
   throw new RuntimeException("the key:" + u.getId() + " does not exist in db!!!");
userRep.save(mapper.map(u,User.class));
}
@Override
public void deleteById(int id) {
userRep.deleteById(id);
}
@Override
public List<UserDTO> getAll() {
  Type t=new TypeToken<List<UserDTO>>(){}.getType();

   return mapper.map((List<User>)userRep.findAll(),t);
}
@Override
public UserDTO getById(int id){
   return mapper.map(userRep.findById(id).get(), UserDTO.class);
}
// @Override
// public UserDTO getByEmail(String email){
//     return mapper.map(userRep.findByEmail(email),UserDTO.class);
// }
@Override
public UserDTO getByEmail(String email){
    User user = userRep.findByEmail(email);
    if (user == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
    }
    return mapper.map(user, UserDTO.class);
}

// public void signUp(String name, String email, String phone, String password, int role) {
//     if (userRep.findByEmail(email) == null) {
//         UserDTO newUser = new UserDTO(name, email, phone, password, role);
//         add(newUser);
//     } else {
//         throw new RuntimeException("User with email " + email + " already exists");
//     }
// }
@Override

public void signUp(UserDTO u) {
    if (userRep.findByEmail(u.getEmail()) == null) {
        add(u);
    } else {
        throw new RuntimeException("User with email " +u.getEmail()  + " already exists");
    }
}

// public void logIn(String email, String password) {
//     User user = userRep.findByEmail(email);
//     if (user == null) {
//         throw new RuntimeException("Email does not exist");
//     } else if (!user.getPassword().equals(password)) {
//         throw new RuntimeException("Password is not correct");
//     }
// }
@Override
public UserDTO logIn(String email, String password) {
    User user = userRep.findByEmail(email);
    if (user == null) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email does not exist");
    }
    if (!user.getPassword().equals(password)) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Password is not correct");

    }
    return mapper.map(user, UserDTO.class);
}

@Override
public void adminChangeRole(int id, UserDTO u) {
    if (!userRep.existsById(id))
        throw new RuntimeException("User with id " + id + " does not exist");

    User user = userRep.findById(id).get();
    user.setRole(u.getRole()); // רק משנה את התפקיד
    userRep.save(user);
}


}

