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
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("${url.users}")
    public ResponseEntity registerUser(@RequestBody @Valid UserDto user) throws Exception {
        userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(String.format("User %s created", user.getUsername()));
    }

    @GetMapping("${url.users}")
    public List<UserDto> registerUser(@RequestParam(name = "group_id", required = false) Long groupId) throws Exception {
        return groupId != null ? userService.getUsersDto(groupId) : userService.getUsersDto();
    }
}
