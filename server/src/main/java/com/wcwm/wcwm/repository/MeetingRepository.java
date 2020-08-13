package com.wcwm.wcwm.repository;

import com.wcwm.wcwm.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findByUserIdAndGroupId(Long userId, Long groupId);
    List<Meeting> findByGroupId(Long groupId);
}