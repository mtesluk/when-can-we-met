package com.wcwm.wcwm.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="User")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    @Column(unique=true)
    private String username;

    @NotBlank
    private String password;

    public User() {

    }

    public User(String username, String password) {
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

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
