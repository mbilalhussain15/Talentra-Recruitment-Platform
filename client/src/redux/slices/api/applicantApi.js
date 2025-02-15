import { apiSlice } from '../apiSlice';


const applicant_URL = '/applicant';


export const applicantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createApplicant: builder.mutation({
      query: (data) => ({
        url: `${applicant_URL}/createApplicant`,
        method: 'POST',
        body: data,
        serviceKey: 'applicantService', 
        credentials: "include", 
      }),
    }),
    updateApplicant: builder.mutation({
        query: ({userId ,data}) => ({
          url: `${applicant_URL}/updateApplicant/${userId}`,
          method: 'PUT',
          body: data,
          serviceKey: 'applicantService', 
          credentials: "include", 
        }),
      }),
      getApplicant: builder.query({
        query: (userId) => ({
          url: `${applicant_URL}/getApplicantById/${userId}`,
          method: 'GET',
          serviceKey: 'applicantService', 
          credentials: 'include',
        }),
        
      }),
  

 
    
  }),
});

export const {
    useCreateApplicantMutation,
    useUpdateApplicantMutation,
    useGetApplicantQuery,
    
  } = applicantApiSlice;