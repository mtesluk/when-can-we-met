package com.wcwm.wcwm.repository;

import com.wcwm.wcwm.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findByUser(String userId);
}