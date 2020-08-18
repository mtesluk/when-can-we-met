package com.wcwm.wcwm.controller;

import com.wcwm.wcwm.dto.UserDto;
import com.wcwm.wcwm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("${url.users}")
    public ResponseEntity registerUser(@RequestBody @Valid UserDto user) throws Exception {
        userService.createUser(user);
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", String.format("User %s created", user.getUsername()));
        return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
    }

    @GetMapping("${url.users}")
    public List<UserDto> registerUser(@RequestParam(name = "group_id", required = false) Long groupId) throws Exception {
        return groupId != null ? userService.getUsersDto(groupId) : userService.getUsersDto();
    }
}
