package com.example.volunteer_platform.controller;

import com.example.volunteer_platform.exception.ResourceNotFoundException;
import com.example.volunteer_platform.model.VolunteerOpportunity;
import com.example.volunteer_platform.service.VolunteerOpportunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
public class VolunteerOpportunityController {

    private final VolunteerOpportunityService volunteerOpportunityService;

    @Autowired
    public VolunteerOpportunityController(VolunteerOpportunityService volunteerOpportunityService) {
        this.volunteerOpportunityService = volunteerOpportunityService;
    }

    // Create a new opportunity
    @PostMapping
    public VolunteerOpportunity createOpportunity(@RequestBody VolunteerOpportunity opportunity) {
        return volunteerOpportunityService.createOpportunity(opportunity);
    }

    // Get all opportunities
    @GetMapping
    public List<VolunteerOpportunity> getAllOpportunities() {
        return volunteerOpportunityService.getAllOpportunities();
    }

    // Get opportunity by ID
    @GetMapping("/{id}")
    public ResponseEntity<VolunteerOpportunity> getOpportunityById(@PathVariable(value = "id") Long id) {
        VolunteerOpportunity opportunity = volunteerOpportunityService.getOpportunityById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found for this id :: " + id));
        return ResponseEntity.ok().body(opportunity);
    }

    // Update opportunity
    @PutMapping("/{id}")
    public ResponseEntity<VolunteerOpportunity> updateOpportunity(@PathVariable(value = "id") Long id,
                                                                  @RequestBody VolunteerOpportunity opportunityDetails) {
        VolunteerOpportunity updatedOpportunity = volunteerOpportunityService.updateOpportunity(id, opportunityDetails);
        return ResponseEntity.ok(updatedOpportunity);
    }

    // Delete opportunity
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable(value = "id") Long id) {
        volunteerOpportunityService.deleteOpportunity(id);
        return ResponseEntity.noContent().build();
    }
}

