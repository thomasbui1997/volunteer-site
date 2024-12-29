import React from 'react';
import OpportunityList from '../components/OpportunityList';
import OpportunityForm from '../components/OpportunityForm';

const Home = () => {
    return (
        <div>
            <OpportunityForm />
            <OpportunityList />
        </div>
    );
};

export default Home;
