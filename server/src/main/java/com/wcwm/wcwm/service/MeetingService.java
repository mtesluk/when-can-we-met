package com.wcwm.wcwm.service;

import com.wcwm.wcwm.dto.MeetingDto;
import com.wcwm.wcwm.mapper.MeetingMapper;
import com.wcwm.wcwm.model.Meeting;
import com.wcwm.wcwm.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MeetingService {
    @Autowired
    private MeetingMapper meetingMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private MeetingRepository meetingRepository;

    public List<MeetingDto> getMeetings(String userId) {

        final List<Meeting> meetings = userId != null ? meetingRepository.findByUser(userId) : meetingRepository.findAll();
        return meetings.stream().map(meeting -> meetingMapper.mapMeetingEntityToMeetingDto(meeting)).collect(Collectors.toList());
    }

    public void createMeetingForUser(MeetingDto meetingDto, String username) {
        final Meeting meeting = meetingMapper.mapMeetingDtoToMeetingEntity(meetingDto);
        meeting.setUser(userService.getUser(username));
        meetingRepository.save(meeting);
    }
}
