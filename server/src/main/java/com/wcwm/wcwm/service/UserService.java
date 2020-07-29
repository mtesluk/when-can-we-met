package com.wcwm.wcwm.service;

import com.wcwm.wcwm.dto.UserDto;
import com.wcwm.wcwm.mapper.UserMapper;
import com.wcwm.wcwm.model.User;
import com.wcwm.wcwm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    UserRepository userRepository;

    public void createUser(UserDto userDto) {
        final User user = userMapper.mapUserDtoToUserEntity(userDto);
        userRepository.save(user);
    }

    public UserDto getUserDto(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
        return userMapper.mapUserEntityToUserDto(user.get());
    }

    public User getUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
        return user.get();
    }
}
