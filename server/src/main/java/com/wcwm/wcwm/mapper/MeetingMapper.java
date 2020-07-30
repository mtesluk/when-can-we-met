package com.wcwm.wcwm.mapper;

import com.wcwm.wcwm.dto.MeetingDto;
import com.wcwm.wcwm.model.Meeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingMapper {
    @Autowired
    static private UserMapper userMapper;

    @Autowired
    static private GroupMapper groupMapper;

    static public MeetingDto mapMeetingEntityToMeetingDto(Meeting meetingEntity) {
        MeetingDto meetingDto = new MeetingDto();
        meetingDto.setName(meetingEntity.getName());
        meetingDto.setStartDate(meetingEntity.getStartDate());
        meetingDto.setEndDate(meetingEntity.getEndDate());
        meetingDto.setId(meetingEntity.getId());
        meetingDto.setUser(userMapper.mapUserEntityToUserDto(meetingEntity.getUser()));
        return meetingDto;
    }

    static public Meeting mapMeetingDtoToMeetingEntity(MeetingDto meetingDto) {
        Meeting meetingEntity = new Meeting();
        meetingEntity.setName(meetingDto.getName());
        meetingEntity.setStartDate(meetingDto.getStartDate());
        meetingEntity.setEndDate(meetingDto.getEndDate());
        meetingEntity.setUser(userMapper.mapUserDtoToUserEntity(meetingDto.getUser()));
        return meetingEntity;
    }
}
