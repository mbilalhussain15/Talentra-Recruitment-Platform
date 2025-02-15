import React, { useState } from "react";
import "../stlyes/AdminDashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import ListAllJobs from "./ListAllJobs/ListAllJobs";
import ListAllUsers from "./ListAllUsers/ListAllUser";
import AdminAccounts from "./AdminAccounts/AdminAccounts";
import AdminProfile from "./AdminProfile/AdminProfile";

const AdminDashboard = () => {
  const [view, setView] = useState("users");

  const users = [
    { name: "Guy Hawkins", role: "Technical Support Specialist" },
    { name: "Jacob Jones", role: "Product Designer" },
    { name: "Cameron Williamson", role: "Marketing Officer" },
    { name: "Robert Fox", role: "Marketing Manager" },
    { name: "Kathryn Murphy", role: "Junior Graphic Designer" },
    { name: "Darlene Robertson", role: "Visual Designer" },
    { name: "Kristin Watson", role: "Senior UX Designer" },
    { name: "Jenny Wilson", role: "Interaction Designer" },
    { name: "Marvin McKinney", role: "Networking Engineer" },
    { name: "Theresa Webb", role: "Software Engineer" },
  ];

  const jobs = [
    { title: "Marketing Manager", company: "SAP" },
    { title: "Job Title", company: "Company Name" },
    { title: "Job Title", company: "Company Name" },
    { title: "Job Title", company: "Company Name" },
    { title: "Job Title", company: "Company Name" },
    { title: "Job Title", company: "Company Name" },
  ];

  return (
    <AdminLayout>
        <Routes>
        <Route path="/listalljobs" element={<ListAllJobs />} />
        <Route path="/listallusers" element={<ListAllUsers />} />
        <Route path="/admin-accounts" element={<AdminAccounts />} />
        <Route path="/profile" element={<AdminProfile />} />
      </Routes>
    </AdminLayout>
    // <div className="admin-dashboard">
    //   <Navbar />
    //   <div className="content">
    //     <div className="dashboard-header">
    //       <button onClick={() => setView("users")} className={view === "users" ? "active" : ""}>Users</button>
    //       <button onClick={() => setView("jobs")} className={view === "jobs" ? "active" : ""}>Jobs</button>
    //     </div>
    //     {view === "users" && (
    //       <div className="user-list">
    //         <h1>List of All Users</h1>
    //         {users.map((user, index) => (
    //           <div className="user-card" key={index}>
    //             <div className="user-info">
    //               <h3>{user.name}</h3>
    //               <p>{user.role}</p>
    //             </div>
    //             <button className="view-profile">View Profile</button>
    //             <button className="delete-profile">Delete Profile</button>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //     {view === "jobs" && (
    //       <div className="job-list">
    //         <h1>List of All Jobs</h1>
    //         {jobs.map((job, index) => (
    //           <div className="job-card" key={index}>
    //             <div className="job-info">
    //               <h3>{job.title}</h3>
    //               <p>{job.company}</p>
    //             </div>
    //             <button className="view-job">View Job</button>
    //             <button className="delete-job">Delete Job</button>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default AdminDashboard;