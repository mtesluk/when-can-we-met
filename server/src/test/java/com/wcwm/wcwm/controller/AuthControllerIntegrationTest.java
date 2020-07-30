package com.wcwm.wcwm.controller;

import com.wcwm.wcwm.model.User;
import com.wcwm.wcwm.repository.UserRepository;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthControllerIntegrationTest {

    @Value("${url.login}")
    private String loginUrl;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testUserLogin() throws Exception {
        String password = "test_password";
        User user = new User("test_user", passwordEncoder.encode(password));
        userRepository.save(user);

        JSONObject data = new JSONObject();
        data.put("username", user.getUsername());
        data.put("password", password);

        RequestBuilder request = post(loginUrl).contentType(MediaType.APPLICATION_JSON_VALUE).content(data.toString());
        MockHttpServletResponse response = mockMvc.perform(request).andReturn().getResponse();
        Integer status = response.getStatus();
        JSONObject content = new JSONObject(response.getContentAsString());

        assertEquals(status, HttpStatus.OK.value());
        assertThat(content.get("token")).isExactlyInstanceOf(String.class);
    }

    @Test
    void testErrorUserLoginWrongPassword() throws Exception {
        JSONObject data = new JSONObject();
        data.put("username", "user");
        data.put("password", "wrong_password");

        RequestBuilder request = post(loginUrl).contentType(MediaType.APPLICATION_JSON_VALUE).content(data.toString());
        MockHttpServletResponse response = mockMvc.perform(request).andReturn().getResponse();
        Integer status = response.getStatus();
        JSONObject content = new JSONObject(response.getContentAsString());

        assertEquals(status, HttpStatus.UNAUTHORIZED.value());
        assertEquals(content.get("message"), "Wrong credentials");
    }
}