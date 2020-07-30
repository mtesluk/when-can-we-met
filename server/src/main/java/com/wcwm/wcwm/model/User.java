package com.wcwm.wcwm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "Username can not be empty")
    @Column(unique=true)
    private String username;

    @NotBlank(message = "Password can not be empty")
    private String password;

    @OneToMany(mappedBy="user")
    private List<Meeting> meetings = new LinkedList<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "users")
    private List<Group> groups = new LinkedList<>();

    public User() { }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public List<Meeting> getMeetings() {
        return meetings;
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

    public void setMeetings(List<Meeting> meetings) { this.meetings = meetings; }

    public List<Group> getGroups() {return groups; }

    public void setGroups(List<Group> groups) { this.groups = groups; }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
