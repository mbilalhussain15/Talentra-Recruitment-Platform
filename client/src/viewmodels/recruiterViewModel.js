import { fetchAllJobs, fetchJobApplications } from "../models/recruiterModel";

export const useRecruiterViewModel = () => {
  const getJobs = async () => {
    return await fetchAllJobs();
  };

  const getJobApplications = async (jobId) => {
    return await fetchJobApplications(jobId);
  };

  return { getJobs, getJobApplications };
};
