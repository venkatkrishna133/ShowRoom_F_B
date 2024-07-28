package com.showroommangement.CarShowRoomDocumentationVerificationSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(scanBasePackages = "com.showroommangement.controller") 
//@ComponentScan("com.showroommangement.service")
@EnableJpaRepositories("com.showroommangement.repository") 
@EntityScan("com.showroommangement.entity")	
public class CarShowRoomDocumentationVerificationSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarShowRoomDocumentationVerificationSystemApplication.class, args);
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:4200").allowedMethods("*").allowedHeaders("*");
			}
		};
	}

}
