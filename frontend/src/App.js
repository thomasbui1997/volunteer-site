import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import OpportunityList from './components/OpportunityList';
import OpportunityForm from './components/OpportunityForm';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create"
                   element={
                      <PrivateRoute>
                        <OpportunityForm />
                      </PrivateRoute>
                   }
            />
            <Route path="/opportunities" element={<OpportunityList />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
