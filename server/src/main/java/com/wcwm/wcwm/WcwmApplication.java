package com.wcwm.wcwm;

import com.wcwm.wcwm.model.User;
import com.wcwm.wcwm.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class WcwmApplication {
	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final Logger log = LoggerFactory.getLogger(WcwmApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(WcwmApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(UserRepository repository) {
		return (args) -> {
			repository.save(new User("user", passwordEncoder.encode("passwd")));

			log.info("Users found with findAll():");
			log.info("-------------------------------");
			for (User user : repository.findAll()) {
				log.info(user.toString());
			}
			log.info("");
		};
	}
}