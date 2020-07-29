package com.wcwm.wcwm.controller;

import com.wcwm.wcwm.dto.UserDto;
import com.wcwm.wcwm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("${url.users}")
    public ResponseEntity registerUser(@RequestBody @Valid UserDto user) throws URISyntaxException {
        userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(String.format("User %s created", user.getUsername()));
    }
}
