package com.wcwm.wcwm.service;

import com.wcwm.wcwm.dto.GroupDto;
import com.wcwm.wcwm.mapper.GroupMapper;
import com.wcwm.wcwm.model.Group;
import com.wcwm.wcwm.model.User;
import com.wcwm.wcwm.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private GroupMapper groupMapper;

    public void createGroup(GroupDto groupDto, String username) {
        final Group group = new Group();
        final List<User> users = new LinkedList<>();
        final User user = userService.getUser(username);

        group.setName(groupDto.getName());
        users.add(user);
        group.setUsers(users);
        groupRepository.save(group);
    }

    public void addUserToGroup(String groupId, List<String> newUsers) {
        Optional<Group> optionalGroup = groupRepository.findById(Long.parseLong(groupId));
        Group group = optionalGroup.get();
        if (group != null) {
            List<User> users = userService.getUsers(newUsers);
            System.out.println(users.toString());
            group.getUsers().addAll(users);
            groupRepository.save(group);
        }

    }

    public GroupDto getGroup(Long id) throws Exception {
        Optional<Group> group = groupRepository.findById(id);
        group.orElseThrow(() -> new Exception("Group not found"));

        return groupMapper.mapGroupEntityToGroupDto(group.get());
    }

    public Group getEntityGroup(Long id) throws Exception {
        Optional<Group> group = groupRepository.findById(id);
        group.orElseThrow(() -> new Exception("Group not found"));

        return group.get();
    }

    public List<GroupDto> getGroups(String username) {
        List<Group> groups = groupRepository.findByUsersUsername(username, Sort.by(Sort.Direction.DESC, "id"));

        return groups.stream().map(group -> groupMapper.mapGroupEntityToGroupDto(group)).collect(Collectors.toList());
    }

}
