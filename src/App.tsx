import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import BrowseSkills from './pages/BrowseSkills';
import EditProfile from './pages/EditProfile';
import SwapRequestDetails from './pages/SwapRequestDetails';
import RatingFeedback from './pages/RatingFeedback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <div>
            <Navigation />
            <Dashboard />
          </div>
        } />
        <Route path="/browse" element={
          <div>
            <Navigation />
            <BrowseSkills />
          </div>
        } />
        <Route path="/profile/edit" element={
          <div>
            <Navigation />
            <EditProfile />
          </div>
        } />
        <Route path="/requests" element={
          <div>
            <Navigation />
            <SwapRequestDetails />
          </div>
        } />
        <Route path="/rating" element={
          <div>
            <Navigation />
            <RatingFeedback />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;