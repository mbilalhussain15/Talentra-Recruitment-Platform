import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "./components/NavbarAdmin";
import TopBar from "../RecruiterDashboard/TopBar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="dashboard-container flex flex-col h-screen">
      <NavbarAdmin />
      <TopBar />
      <div className="flex flex-1">
        <AdminSidebar />
        {/* Main Content */}
        <main className="dashboard-main-content flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;