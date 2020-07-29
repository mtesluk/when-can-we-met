package com.wcwm.wcwm.controller;

import com.wcwm.wcwm.model.CustomUserDetails;
import com.wcwm.wcwm.model.User;
import com.wcwm.wcwm.service.AuthService;
import com.wcwm.wcwm.service.CustomUserDetailsService;
import com.wcwm.wcwm.util.JwtUtil;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class AuthControllerTest {

    @Value("${url.login}")
    private String loginUrl;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @MockBean
    private CustomUserDetailsService userDetailsService;

    @MockBean
    private JwtUtil jwtUtil;

    @Test
    void testUserLogin() throws Exception {
        final String username = "user_test";
        final String password = "password_test";
        final String token = "dasg432fgdaw221vdasd";

        doNothing().when(authService).authenticate(username, password);
        when(userDetailsService.loadUserByUsername(anyString())).thenReturn(new CustomUserDetails(new User()));
        when(jwtUtil.generateToken(any(CustomUserDetails.class))).thenReturn(token);

        JSONObject data = new JSONObject();
        data.put("username", username);
        data.put("password", password);

        RequestBuilder request = post(loginUrl).contentType(MediaType.APPLICATION_JSON_VALUE).content(data.toString());
        MockHttpServletResponse response = mockMvc.perform(request).andReturn().getResponse();
        Integer status = response.getStatus();
        JSONObject content = new JSONObject(response.getContentAsString());

        assertEquals(status, HttpStatus.OK.value());
        assertEquals(content.get("token"), token);
    }

    @Test
    void testErrorUserLoginWithBadCredential() throws Exception {
        final String username = "user_test";
        final String password = "password_test";
        final String token = "dasg432fgdaw221vdasd";

        doThrow(BadCredentialsException.class).when(authService).authenticate(username, password);
        when(userDetailsService.loadUserByUsername(anyString())).thenReturn(new CustomUserDetails(new User()));
        when(jwtUtil.generateToken(any(CustomUserDetails.class))).thenReturn(token);

        JSONObject data = new JSONObject();
        data.put("username", username);
        data.put("password", password);

        RequestBuilder request = post(loginUrl).contentType(MediaType.APPLICATION_JSON_VALUE).content(data.toString());
        MockHttpServletResponse response = mockMvc.perform(request).andReturn().getResponse();
        Integer status = response.getStatus();
        JSONObject content = new JSONObject(response.getContentAsString());

        assertEquals(status, HttpStatus.UNAUTHORIZED.value());
        assertEquals(content.get("message"), "Wrong credentials");
    }
}