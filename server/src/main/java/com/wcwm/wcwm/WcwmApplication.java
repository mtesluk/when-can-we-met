package com.wcwm.wcwm;

import com.wcwm.wcwm.model.Group;
import com.wcwm.wcwm.model.Meeting;
import com.wcwm.wcwm.model.User;
import com.wcwm.wcwm.repository.GroupRepository;
import com.wcwm.wcwm.repository.MeetingRepository;
import com.wcwm.wcwm.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@SpringBootApplication
public class WcwmApplication {
	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final Logger log = LoggerFactory.getLogger(WcwmApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(WcwmApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(UserRepository userRepository, MeetingRepository meetingRepository, GroupRepository groupRepository) {
		return (args) -> {
			User newUser = userRepository.save(new User("user", passwordEncoder.encode("passwd")));
			Group group = new Group("name1");
			Group newGroup = groupRepository.save(group);
			newGroup.getUsers().add(newUser);
			groupRepository.save(newGroup);
			meetingRepository.save(new Meeting("new", new Date(), new Date(), newUser, newGroup));
			meetingRepository.save(new Meeting("second", new Date(), new Date(), newUser, newGroup));

			log.info("Everything findAll():");
			log.info("-------------------------------");
			for (User user : userRepository.findAll()) {
				log.info(user.toString());
			}
			for (Meeting m : meetingRepository.findAll()) {
				log.info(m.toString());
			}
			for (Group g : groupRepository.findAll()) {
				log.info(g.toString());
			}
			log.info("");
		};
	}
}