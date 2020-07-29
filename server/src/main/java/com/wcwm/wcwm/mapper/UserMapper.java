package com.wcwm.wcwm.mapper;

import com.wcwm.wcwm.dto.UserDto;
import com.wcwm.wcwm.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    static public UserDto mapUserEntityToUserDto(User userEntity) {
        UserDto userDto = new UserDto();
        userDto.setUsername(userEntity.getUsername());
        userDto.setId(userEntity.getId());
        return userDto;
    }

    static public User mapUserDtoToUserEntity(UserDto userDto) {
        User userEntity = new User();
        if (userDto != null) {
            userEntity.setUsername(userDto.getUsername());
            userEntity.setPassword(userDto.getPassword());
        }
        return userEntity;
    }
}
