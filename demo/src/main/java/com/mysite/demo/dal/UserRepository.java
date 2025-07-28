


package com.mysite.demo.dal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.mysite.demo.model.User;
@Repository

public interface UserRepository extends CrudRepository<User, Integer> {
    public User findByName(String name );
    // public User findById (int id);
    public User findByEmail(String email );

}
