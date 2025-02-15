import { fetchJobs, fetchApplications } from "../models/applicantModel";

export const useApplicantViewModel = () => {
  const getJobs = async () => {
    return await fetchJobs();
  };

  const getApplications = async () => {
    return await fetchApplications();
  };

  const applyForJob = async (applicantId, jobId) => {
    // Implement the logic to apply for a job
  };

  return { getJobs, getApplications, applyForJob };
};
