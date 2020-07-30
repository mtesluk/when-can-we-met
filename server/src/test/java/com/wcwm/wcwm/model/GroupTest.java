package com.wcwm.wcwm.model;

import com.wcwm.wcwm.repository.GroupRepository;
import com.wcwm.wcwm.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.TransactionSystemException;

import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class GroupTest {
    // TODO: Add test checking unique name

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testCreateGroupEntity() throws Exception {
        User user = new User("username", "password");
        Group group = new Group();
        group.setName("group_name");
        group.getUsers().add(user);
        user.getGroups().add(group);

        groupRepository.save(group);
    }

    @Test
    void testErrorCreateGroupEntity_UserMustExists() throws Exception {
        Exception exception = assertThrows(TransactionSystemException.class, () -> {
            Group group = new Group();
            group.setName("group_name");
            groupRepository.save(group);
        });

        ConstraintViolationException exc = (ConstraintViolationException) exception.getCause().getCause();
        final List<String> errors = new ArrayList<String>();
        for (final ConstraintViolation<?> violation : exc.getConstraintViolations()) {
            errors.add(violation.getMessage());
        }

        assertEquals(errors.get(0), "Group must have at least one connected user");
    }

    @Test
    void testErrorCreateGroupEntity_NameNotBlank() throws Exception {
        TransactionSystemException exception = assertThrows(TransactionSystemException.class, () -> {
            User user = new User("username", "password");
            Group group = new Group();
            group.setName("");
            group.getUsers().add(user);
            user.getGroups().add(group);

            groupRepository.save(group);
        });

        final List<String> errors = new ArrayList<String>();
        ConstraintViolationException exc = (ConstraintViolationException) exception.getCause().getCause();
        for (final ConstraintViolation<?> violation : exc.getConstraintViolations()) {
            errors.add(violation.getMessage());
        }

        assertEquals(errors.get(0), "Group name can not be empty");
    }
}