package com.example.volunteer_platform.repository;

import com.example.volunteer_platform.model.VolunteerOpportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerOpportunityRepository extends JpaRepository<VolunteerOpportunity, Long> {
    // Additional query methods can be defined here
}
