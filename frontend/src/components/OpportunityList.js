import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OpportunityList.css';

const OpportunityList = () => {
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/opportunities', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                });
                setOpportunities(response.data);
            } catch (error) {
                console.error('Error fetching opportunities: ', error)
            }
        };
        fetchOpportunities();
    }, []);

    return (
        <div className="opportunity-list">
            <h2>Available Volunteer Opportunities</h2>
            {opportunities.length === 0 ? (
                <p>No opportunities available at the moment.</p>
            ) : (
                <ul>
                    {opportunities.map(opportunity => (
                        <li key={opportunity.id} className="opportunity-item">
                            <h3>{opportunity.title}</h3>
                            <p>{opportunity.description}</p>
                            <p><strong>Location:</strong> {opportunity.location}</p>
                            <p><strong>Date:</strong> {opportunity.date}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OpportunityList;