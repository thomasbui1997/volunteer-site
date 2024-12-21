package com.example.volunteer_platform;
import org.springframework.stereotype.Service;

@Service
public class HealthService {
    public String getHealthStatus() {
        return "Application is healthy!";
    }
}
