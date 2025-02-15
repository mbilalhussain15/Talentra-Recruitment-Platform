import React from "react";

const HomeTab = () => {
  return (
    <div>
      <h2>Overview</h2>
      <div className="dashboard-overview">
        <div className="overview-card">
          <h3>589</h3>
          <p>Open Jobs</p>
        </div>
        <div className="overview-card">
          <h3>2,517</h3>
          <p>Saved Candidates</p>
        </div>
      </div>
      <h3>Recently Posted Jobs</h3>
      <table className="job-list">
        <thead>
          <tr>
            <th>Job</th>
            <th>Status</th>
            <th>Applications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UI/UX Designer</td>
            <td className="status-active">Active</td>
            <td>798 Applications</td>
            <td>
              <button>View Applications</button>
            </td>
          </tr>
          <tr>
            <td>Technical Support Specialist</td>
            <td className="status-active">Active</td>
            <td>556 Applications</td>
            <td>
              <button>View Applications</button>
            </td>
          </tr>
          <tr>
            <td>Front End Developer</td>
            <td className="status-expired">Expired</td>
            <td>740 Applications</td>
            <td>
              <button>View Applications</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HomeTab;
