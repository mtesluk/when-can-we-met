package com.wcwm.wcwm.service;

import com.wcwm.wcwm.dto.MeetingDto;
import com.wcwm.wcwm.mapper.MeetingMapper;
import com.wcwm.wcwm.model.Group;
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

    @Autowired
    private GroupService groupService;

    public List<MeetingDto> getMeetingsDto(String groupId, String userId) {
        final List<Meeting> meetings = userId != null ? meetingRepository.findByUserIdAndGroupId(Long.parseLong(userId), Long.parseLong(groupId)) : meetingRepository.findByGroupId(Long.parseLong(groupId));
        return meetings.stream().map(meeting -> meetingMapper.mapMeetingEntityToMeetingDto(meeting)).collect(Collectors.toList());
    }

    public void createMeetingForUser(MeetingDto meetingDto, String username) throws Exception {
        final Meeting meeting = meetingMapper.mapMeetingDtoToMeetingEntity(meetingDto);
        final Group group = groupService.getEntityGroup(meetingDto.getGroupId());
        meeting.setUser(userService.getUser(username));
        meeting.setGroup(group);
        group.getMeetings().add(meeting);
        Meeting createdMeeting = meetingRepository.save(meeting);

    }
}
