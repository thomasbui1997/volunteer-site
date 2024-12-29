import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './OpportunityForm.css'; // Optional: For styling

const OpportunityForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: ''
    });

    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/opportunities', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setMessage({ type: 'success', text: 'Opportunity created successfully!' });
            setFormData({
                title: '',
                description: '',
                location: '',
                date: ''
            });
            navigate('/opportunities');
        } catch (error) {
            console.error('Error creating opportunity:', error);
            const errorMsg = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Failed to create opportunity.';
            setMessage({ type: 'error', text: errorMsg });
        }
    };

    return (
        <motion.div
            className="opportunity-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Create a New Volunteer Opportunity</h2>
            {message.text && (
                <p className={message.type === 'success' ? 'success-message' : 'error-message'}>
                    {message.text}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Opportunity</button>
            </form>
        </motion.div>
    );
};

export default OpportunityForm;
