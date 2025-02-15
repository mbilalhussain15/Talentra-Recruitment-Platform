import React, { useEffect, useState } from "react";
import { useApplicantViewModel } from "../../viewmodels/applicantViewModel";
import ApplyJobModel from "./components/ApplyJobModel"; // Import ApplyJobModel
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomeTab = () => {
  const { getJobs } = useApplicantViewModel();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State to manage selected job
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchJobs = async () => {
      const jobData = await getJobs();
      setJobs(jobData);
    };
    fetchJobs();
  }, []);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    navigate(`/applicant/dashboard/job/${job.id}`); // Navigate to job details route
  };

  return (
    <div>
      <h1>Available Jobs</h1>
      {jobs.map((job) => (
        <div key={job.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h2>{job.title}</h2>
          <p>Skills: {job.skills}</p>
          <p>Salary: {job.salary}</p>
          <p>Type: {job.type}</p>
          <button onClick={() => handleViewDetails(job)}>View Details</button> {/* Set selected job */}
        </div>
      ))}
      {selectedJob && (
        <ApplyJobModel
          job={selectedJob}
          onClose={() => setSelectedJob(null)} // Close the modal
        />
      )}
    </div>
  );
};

export default HomeTab;
