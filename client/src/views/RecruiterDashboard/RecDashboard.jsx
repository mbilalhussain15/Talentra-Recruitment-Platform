import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import ProfileTab from "./ProfileTab";
import PostJob from "./PostJob";
import MyJobsTab from "./MyJobsTab";
import LogoutTab from "./LogoutTab";
import Overview from "./overview/Overview";
import RecPayment from "./RecPayment";
import LoginPage from "../../views/MainPage";
import ViewAllJobs from "./ViewAllJobs";
import SavedCandidates from "./SavedCandidates/SavedCandidates";
import JobApplications from "./components/JobApplications";

const RecDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/profile" element={<ProfileTab />} />
        <Route path="/my-jobs" element={<MyJobsTab />} />
        <Route path="/view-jobs" element={<ViewAllJobs />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/saved-candidates" element={<SavedCandidates />} />
        <Route path="/logout" element={<LogoutTab />} />
        <Route path="/plans-billing" element={<RecPayment />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/jobApplications" element={<JobApplications />} /> */}
      </Routes>
    </DashboardLayout>
  );
};

export default RecDashboard;