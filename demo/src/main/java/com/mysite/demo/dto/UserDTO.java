package com.mysite.demo.dto;


import lombok.Data;

@Data
public class UserDTO {
 
     private int id; 
     private String email;
     private String name;
     private String phone;
     private String password;
     private int role;
     public UserDTO() {}

        public UserDTO(String name,String email,String phone,String password,int role)
     {
          this.name=name;
          this.email=email;
          this.phone=phone;
          this.password=password;
          this.role=role;
     }
}
