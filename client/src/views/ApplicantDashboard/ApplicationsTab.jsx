import React, { useEffect, useState } from "react";
import { useApplicantViewModel } from "../../viewmodels/applicantViewModel";
import { useNavigate } from "react-router-dom";

const ApplicationsTab = () => {
  const { getApplications } = useApplicantViewModel();
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      const applicationData = await getApplications();
      setApplications(applicationData);
    };
    fetchApplications();
  }, []);

  const handleViewDetailsClick = (jobId) => {
    navigate(`/applyJob/${jobId}`);
  };

  return (
    <div>
      <h1>My Applications</h1>
      {applications.map((application) => (
        <div key={application.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h2>{application.title}</h2>
          <p>Status: {application.status}</p>
          <button onClick={() => handleViewDetailsClick(application.id)}>View Details</button>
        </div>
      ))}
    </div>
  );
};

export default ApplicationsTab;
