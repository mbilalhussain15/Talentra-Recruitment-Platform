import { apiSlice } from '../apiSlice'

const job_URL = '/job'
const application_URL = '/application';
const recruiter_URL = '/recruiter';
const applicant_URL = '/applicant';


export const recruiterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${job_URL}/${userId}/createJob`,
        method: "POST",
        body: data,
        serviceKey: "recruiterService",
        credentials: 'include',
      }),
    }),

    getAllJobs: builder.query({
      query: (userId) => ({
        url: `${job_URL}/getJobsByRecruiter/${userId}`,
        method: "GET",
        serviceKey: "recruiterService",
        credentials: 'include',
      }),
    }),

    getRecruiterByID: builder.query({
      query: (userId) => ({
        url: `${recruiter_URL}/getRecruiterByID/${userId}`,
        method: "GET",
        serviceKey: "recruiterService",
        credentials: 'include',
      }),
    }),

    getAllRecJobs: builder.query({
      query: (userId) => ({
        url: `${job_URL}/getAllJob`,
        method: "GET",
        serviceKey: "recruiterService",
        credentials: 'include',
      }),
      providesTags: (result) =>
        result && result.jobs
          ? [
              ...result.jobs.map(({ id }) => ({ type: "Jobs", id })), // Tag each job with its ID
              { type: "Jobs", id: "LIST" }, // Tag for the entire job list
            ]
          : [{ type: "Jobs", id: "LIST" }],
    }),

    // DELETE JOB !
    deleteJob: builder.mutation({
      query: (deleteJobId) => ({
        url: `${job_URL}/deleteJob/${deleteJobId}`,
        method: "DELETE",
        serviceKey: "recruiterService",
        credentials: 'include',
      }),
      invalidatesTags: [{ type: "Jobs", id: "LIST" }],
    }),

    getJobApplications: builder.query({
      query: (jobId) => ({
        url: `${application_URL}/jobs/applications/${jobId}`,
        method: "GET",
        serviceKey: "recruiterService",
        credentials: 'include',
      }),
    }),

    updateApplicationStatus: builder.mutation({
      query: ({ userId, jobId, status }) => ({
        url: `${application_URL}/updatestatus/${userId}/${jobId}/`,
        method: "PUT",
        body: { status },
        serviceKey: "recruiterService",
        credentials: 'include',
      }),
    }),

    updateRecruiter: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${recruiter_URL}/updateRecruiter/${userId}`,
        method: "PUT",
        body: data,
        serviceKey: "recruiterService",
        credentials: 'include',
      }),
    }),

    getTopJobs: builder.query({
      query: (userId) => ({
        url: `${job_URL}/getTopJobsByRecruiter/${userId}`,
        method: "GET",
        serviceKey: "recruiterService",
        credentials: 'include',
      }),
    }),

    getAllShortlistedCandidates: builder.query({
      query: (jobUserId) => ({
        url: `${application_URL}/shortlisted-candidates/${jobUserId}`,
        method: "GET",
        serviceKey: "recruiterService",
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useGetJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useUpdateRecruiterMutation,
  useGetAllRecJobsQuery,
  useGetTopJobsQuery,
  useGetRecruiterByIDQuery,
  useDeleteJobMutation,
  useGetAllShortlistedCandidatesQuery
} = recruiterApiSlice;
