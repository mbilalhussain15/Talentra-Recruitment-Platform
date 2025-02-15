import { fetchAllJobs, fetchJobApplications } from "../models/recruiterModel";

export const useRecruiterViewModel = () => {
  const getJobs = async () => {
    return await fetchAllJobs();
  };

  const getJobApplications = async (jobId) => {
    return await fetchJobApplications(jobId);
  };

  const applyForJob = async (applicantId, jobId) => {
    // Implement the logic to apply for a job
  };

  return { getJobs, getJobApplications, applyForJob };
};
