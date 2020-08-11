package com.wcwm.wcwm.controller;

import com.wcwm.wcwm.dto.GroupDto;
import com.wcwm.wcwm.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping("${url.groups}")
    public ResponseEntity getGroups(Authentication authentication) {
        final String username = authentication.getName();
        List<GroupDto> groups = groupService.getGroups(username);
        return ResponseEntity.status(HttpStatus.OK).body(groups);
    }

    @GetMapping("${url.groups}" + "/{id}")
    public ResponseEntity getGroup(@PathVariable(name = "id") Long groupId, Authentication authentication) throws Exception {
        final String username = authentication.getName();
        GroupDto group = groupService.getGroup(groupId);
        return ResponseEntity.status(HttpStatus.CREATED).body(group);
    }

    @PostMapping("${url.groups}")
    public ResponseEntity createGroup(@RequestBody GroupDto group, Authentication authentication) {
        final String username = authentication.getName();
        groupService.createGroup(group, username);
        // TODO: Create some generic message Obj
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", String.format("Group '%s' created", group.getName()));
        return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
    }

    @PostMapping("${url.groups}" + "/{id}/add_user")
    public ResponseEntity addUserToGroup(@PathVariable(name = "id") String groupId, @RequestBody List<String> newUsers) {
        groupService.addUserToGroup(groupId, newUsers);
        // TODO: Create some generic message Obj, the same
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", String.format("Group '%s' added: %s", groupId, newUsers.toString()));
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
