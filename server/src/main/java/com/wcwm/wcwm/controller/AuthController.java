package com.wcwm.wcwm.controller;

import com.wcwm.wcwm.model.AuthenticationRequest;
import com.wcwm.wcwm.model.AuthenticationResponse;
import com.wcwm.wcwm.service.AuthService;
import com.wcwm.wcwm.service.CustomUserDetailsService;
import com.wcwm.wcwm.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("${url.login}")
    public ResponseEntity login(@RequestBody AuthenticationRequest authenticationRequestBody) throws Exception {
        authService.authenticate(authenticationRequestBody.getUsername(), authenticationRequestBody.getPassword());
        final UserDetails userDetail = userDetailsService.loadUserByUsername(authenticationRequestBody.getUsername());
        final String token = jwtUtil.generateToken(userDetail);
        return ResponseEntity.ok(new AuthenticationResponse(token));
    }



}
