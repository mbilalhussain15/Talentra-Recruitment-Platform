import PropTypes from "prop-types";
import RecSidebar from "./RecSidebar";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import JobApplications from "./components/JobApplications";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container flex flex-col h-screen">
      <Navbar />
      <TopBar />
      <div className="flex flex-1">
        <RecSidebar />

        {/* Main Content */}
        <main className="dashboard-main-content flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="jobApplications" element={<JobApplications />} /> {/* Ensure this path matches the navigation path */}
            {/* Other routes */}
          </Routes>
          {children}
        </main>
      </div>
    </div>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
