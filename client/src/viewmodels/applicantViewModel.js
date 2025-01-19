import { fetchJobs, fetchApplications } from "../models/applicantModel";

export const useApplicantViewModel = () => {
  const getJobs = async () => {
    return await fetchJobs();
  };

  const getApplications = async () => {
    return await fetchApplications();
  };

  return { getJobs, getApplications };
};
