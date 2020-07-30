package com.wcwm.wcwm.repository;

import com.wcwm.wcwm.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long>  {
    List<Group> findByUsersUsername(String username);
}
