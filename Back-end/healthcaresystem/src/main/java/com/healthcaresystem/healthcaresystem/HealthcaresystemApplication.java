package com.healthcaresystem.healthcaresystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class HealthcaresystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthcaresystemApplication.class, args);
	}

}
