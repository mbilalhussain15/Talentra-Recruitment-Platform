import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage"; // Your existing main page
import RecDashboard from "./views/RecruiterDashboard/RecDashboard"; // Recruiter Dashboard component
import HomeTab from "./views/ApplicantDashboard/HomeTab"; // Applicant's HomeTab for testing

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login or signup */}
        <Route path="/" element={<MainPage />} />

        {/* Recruiter Dashboard */}
        <Route path="/recruiter/dashboard" element={<RecDashboard />} />

        {/* Applicant Home (for applicants after login) */}
        <Route path="/applicant/home" element={<HomeTab />} />
      </Routes>
    </Router>
  );
};

export default App;
