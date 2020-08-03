package com.wcwm.wcwm.service;

import com.wcwm.wcwm.dto.UserDto;
import com.wcwm.wcwm.mapper.UserMapper;
import com.wcwm.wcwm.model.User;
import com.wcwm.wcwm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    UserRepository userRepository;

    public void createUser(UserDto userDto) {
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        final User user = userMapper.mapUserDtoToUserEntity(userDto);
        userRepository.save(user);
    }

    public User getUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
        return user.get();
    }

    public List<UserDto> getUsersDto(Long groupId) {
        return userRepository.findByGroupsId(groupId).stream().map(user -> userMapper.mapUserEntityToUserDto(user)).collect(Collectors.toList());
    }

    public List<UserDto> getUsersDto() {
        return userRepository.findAll().stream().map(user -> userMapper.mapUserEntityToUserDto(user)).collect(Collectors.toList());
    }

    public List<User> getUsers(List<String> users) {
        return userRepository.findByUsernameContaining(users);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
