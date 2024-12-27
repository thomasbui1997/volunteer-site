package com.example.volunteer_platform.service;

import com.example.volunteer_platform.exception.ResourceNotFoundException;
import com.example.volunteer_platform.model.VolunteerOpportunity;
import com.example.volunteer_platform.repository.VolunteerOpportunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VolunteerOpportunityService {

    private final VolunteerOpportunityRepository volunteerOpportunityRepository;

    @Autowired
    public VolunteerOpportunityService(VolunteerOpportunityRepository volunteerOpportunityRepository) {
        this.volunteerOpportunityRepository = volunteerOpportunityRepository;
    }

    // Create
    public VolunteerOpportunity createOpportunity(VolunteerOpportunity opportunity) {
        return volunteerOpportunityRepository.save(opportunity);
    }

    // Read All
    public List<VolunteerOpportunity> getAllOpportunities() {
        return volunteerOpportunityRepository.findAll();
    }

    // Read by ID
    public Optional<VolunteerOpportunity> getOpportunityById(Long id) {
        return volunteerOpportunityRepository.findById(id);
    }

    // Update
    public VolunteerOpportunity updateOpportunity(Long id, VolunteerOpportunity opportunityDetails) {
        VolunteerOpportunity opportunity = volunteerOpportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found for this id :: " + id));

        opportunity.setTitle(opportunityDetails.getTitle());
        opportunity.setDescription(opportunityDetails.getDescription());
        opportunity.setLocation(opportunityDetails.getLocation());

        return volunteerOpportunityRepository.save(opportunity);
    }

    // Delete
    public void deleteOpportunity(Long id) {
        VolunteerOpportunity opportunity = volunteerOpportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found for this id :: " + id));

        volunteerOpportunityRepository.delete(opportunity);
    }
}
