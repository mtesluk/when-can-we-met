package com.wcwm.wcwm.service;

import com.wcwm.wcwm.dto.UserDto;
import com.wcwm.wcwm.model.User;
import com.wcwm.wcwm.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @Test
    public void testCreateNewUser() throws Exception {
        when(userRepository.save(any(User.class))).thenReturn(new User());
        userService.createUser(new UserDto("user", "passwd"));
        verify(userRepository, atLeastOnce()).save(any(User.class));
    }

}