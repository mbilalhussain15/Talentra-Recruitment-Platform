import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; 
import MainPage from "./views/MainPage";
import ForgotPassword from "./views/Auth/ForgotPassword";
import ResetPassword from "./views/Auth/ResetPassword";
import RecDashboard from "./views/RecruiterDashboard/RecDashboard";
import { ApplicantDashboard } from "./views/ApplicantDashboard/ApplicantDashboard"; 
import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
import HomeTab from "./views/RecruiterDashboard/HomeTab"; 
import JobsList from "./views/ApplicantDashboard/JobsList";
import AppliedJobs from "./views/ApplicantDashboard/AppliedJobs";
import FavoriteJobs from "./views/ApplicantDashboard/FavoriteJobs";
import ProfileTab from "./views/ApplicantDashboard/ProfileTab";
import JobDetails from "./views/ApplicantDashboard/JobDetails";
import RecPayment from './views/RecruiterDashboard/RecPayment';
import ErrorPage from './views/RecruiterDashboard/ErrorPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Login or signup */}
          <Route path="/" element={<MainPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Recruiter Views */}
          <Route path="/recruiter/dashboard/*" element={<RecDashboard />} />
          <Route path="/recruiter/dashboard/error" element={<ErrorPage />} />

          {/* Applicant Views */}
          <Route path="/applicant/dashboard/*" element={<ApplicantDashboard />} />
          {/* Applicant Home (for applicants after login) */}
          <Route path="/applicant/home" element={<HomeTab />} />
          <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
          <Route path="/applicant/dashboard/*" element={<ApplicantDashboard />} />
          <Route path="/applicant/jobs" element={<JobsList />} /> 
          <Route path="/applicant/applied-jobs" element={<AppliedJobs />} /> 
          <Route path="/applicant/favorite-jobs" element={<FavoriteJobs />} />
          <Route path="/applicant/profile" element={<ProfileTab />} />
          <Route path="/applicant/recent-jobs" element={<JobsList />} />
          <Route path="/applyJob/:jobId" element={<JobDetails />} />
          
          {/* Admin Views */}
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;