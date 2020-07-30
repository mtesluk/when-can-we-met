package com.wcwm.wcwm.mapper;

import com.wcwm.wcwm.dto.GroupDto;
import com.wcwm.wcwm.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class GroupMapper {

    @Autowired
    static private UserMapper userMapper;

    static public GroupDto mapGroupEntityToGroupDto(Group groupEntity) {
        GroupDto groupDto = new GroupDto();
        groupDto.setId(groupEntity.getId());
        groupDto.setName(groupEntity.getName());
        groupDto.setUsers(groupEntity.getUsers().stream().map(user -> userMapper.mapUserEntityToUserDto(user)).collect(Collectors.toList()));
        return groupDto;
    }

    static public Group mapGroupDtoToGroupEntity(GroupDto groupDto) {
        Group groupEntity = new Group();
        groupEntity.setName(groupDto.getName());
        groupEntity.setUsers(groupDto.getUsers().stream().map(user -> userMapper.mapUserDtoToUserEntity(user)).collect(Collectors.toList()));
        return groupEntity;
    }
}
