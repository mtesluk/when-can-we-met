package com.wcwm.wcwm.service;

import com.wcwm.wcwm.dto.UserDto;
import com.wcwm.wcwm.model.User;
import com.wcwm.wcwm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    public void createUser(UserDto data) {
        User user = new User();
        user.setPassword(passwordEncoder.encode(data.getPassword()));
        user.setUsername(data.getUsername());
        userRepository.save(user);
    }
}
