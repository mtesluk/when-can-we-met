package com.wcwm.wcwm.repository;

import com.wcwm.wcwm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.username IN ?1")
    List<User> findByUsernameContaining(List<String> usernames);

    List<User> findByGroupsId(Long id);
}
