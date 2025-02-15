import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define all base URLs for different services
const serviceUrls = {
  authService: 'http://localhost:5001',
  recruiterService: 'http://localhost:5002',
  applicantService: 'http://localhost:5003',
  adminService: 'http://localhost:5004',
};

// Custom base query to dynamically select the base URL
const dynamicBaseQuery = async (args, api, extraOptions) => {
  const { serviceKey, ...restArgs } = args;

  const baseUrl = serviceUrls[serviceKey] + '/api';

  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
  });

  return rawBaseQuery(restArgs, api, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({}),
});

export default apiSlice;
