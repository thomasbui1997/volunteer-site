package com.example.volunteer_platform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    private HealthService healthService;

    @GetMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @Autowired
    public void HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping("/health")
    public String healthCheck() {
        return healthService.getHealthStatus();
    }
}
