package com.wcwm.wcwm.dto;

import javax.validation.constraints.*;

public class UserDto {
    private Long id;

    @NotBlank(message = "Username can not be blank")
    private String username;

    @Size(min = 8, message = "Password must be greater than or equal to 8")
    private String password;

    public UserDto() {
    }

    public UserDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
