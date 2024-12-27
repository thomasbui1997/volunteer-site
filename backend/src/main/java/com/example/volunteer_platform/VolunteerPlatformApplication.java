package com.example.volunteer_platform;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;



@SpringBootApplication
public class VolunteerPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(VolunteerPlatformApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {
			System.out.println("Let's inspect the beans provided by Spring Boot:");
			String[] beanNames = ctx.getBeanDefinitionNames();
//			for (String beanName : beanNames) {
//				System.out.println(beanName);
//			}
		};
	}

}
