import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/job/getJobByID/${jobId}`, {
          withCredentials: true, // Send cookies with the request
        });
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>Salary: {job.salary}</p>
      <p>Location: {job.location}</p>
      <p>Job Type: {job.jobType}</p>
      {/* Add more job details as needed */}
    </div>
  );
};

export default JobDetails;
