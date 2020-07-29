package com.wcwm.wcwm.controller;

import com.wcwm.wcwm.dto.MeetingDto;
import com.wcwm.wcwm.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MeetingController {

    @Autowired
    MeetingService meetingService;

    @GetMapping("${url.meetings}")
    public List<MeetingDto> getMeetings(@RequestParam(required = false, name = "user") String userId) {
        return meetingService.getMeetings(userId);
    }

    @PostMapping("${url.meetings}")
    public ResponseEntity saveMeeting(@RequestBody MeetingDto meeting, Authentication authentication) {
        meetingService.createMeetingForUser(meeting, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(String.format("Meeting '%s' created", meeting.getName()));
    }
}
