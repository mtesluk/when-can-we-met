package com.wcwm.wcwm.controller;

import com.wcwm.wcwm.dto.UserDto;
import com.wcwm.wcwm.service.UserService;
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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;


import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UserControllerTest {

    @Value("${url.users}")
    private String usersUrl;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService service;

    @Test
    public void testRegisterNewUser() throws Exception {
        doNothing().when(service).createUser(any(UserDto.class));

        JSONObject data = new JSONObject();
        data.put("username", "user");
        data.put("password", "password");

        mockMvc.perform(
                post(usersUrl).contentType(MediaType.APPLICATION_JSON_VALUE).content(data.toString())
        ).andExpect(status().isCreated());
    }

    @Test
    public void testErrorRegisterNewUserWithNoUsername() throws Exception {
        JSONObject data = new JSONObject();
        data.put("password", "password");
        RequestBuilder request = post(usersUrl).contentType(MediaType.APPLICATION_JSON_VALUE).content(data.toString());

        MockHttpServletResponse response = mockMvc.perform(request).andReturn().getResponse();
        Integer status = response.getStatus();
        String content = response.getContentAsString();
        assertEquals(status, HttpStatus.BAD_REQUEST.value());
        assertTrue(content.contains("Username can not be blank"));
    }

    @Test
    public void testErrorRegisterNewUserWithEmptyUsername() throws Exception {
        JSONObject data = new JSONObject();
        data.put("username", "");
        data.put("password", "password");
        RequestBuilder request = post(usersUrl).contentType(MediaType.APPLICATION_JSON_VALUE).content(data.toString());

        MockHttpServletResponse response = mockMvc.perform(request).andReturn().getResponse();
        Integer status = response.getStatus();
        String content = response.getContentAsString();
        assertEquals(status, HttpStatus.BAD_REQUEST.value());
        assertTrue(content.contains("Username can not be blank"));
    }

    @Test
    public void testErrorRegisterNewUserWithWrongPassword() throws Exception {
        JSONObject data = new JSONObject();
        data.put("username", "user");
        data.put("password", "pass");
        RequestBuilder request = post(usersUrl).contentType(MediaType.APPLICATION_JSON_VALUE).content(data.toString());

        MockHttpServletResponse response = mockMvc.perform(request).andReturn().getResponse();
        Integer status = response.getStatus();
        String content = response.getContentAsString();
        assertEquals(status, HttpStatus.BAD_REQUEST.value());
        assertTrue(content.contains("Password must be greater than or equal to 8"));
    }
}