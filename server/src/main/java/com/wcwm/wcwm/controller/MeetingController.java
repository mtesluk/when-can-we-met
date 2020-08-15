package com.wcwm.wcwm.controller;

import com.wcwm.wcwm.dto.MeetingDto;
import com.wcwm.wcwm.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MeetingController {

    @Autowired
    MeetingService meetingService;

    @GetMapping("${url.meetings}")
    public List<MeetingDto> getMeetings(@RequestParam(required = false, name = "user_id") String userId, @RequestParam(name = "group_id") String groupId) {
        return meetingService.getMeetingsDto(groupId, userId);
    }

    @PostMapping("${url.meetings}")
    public ResponseEntity saveMeeting(@RequestBody MeetingDto meeting, Authentication authentication) throws Exception {
        meetingService.createMeetingForUser(meeting, authentication.getName());
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", String.format("Meeting '%s' created", meeting.getName()));
        return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
    }
}
