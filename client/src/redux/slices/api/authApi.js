import { apiSlice } from '../apiSlice'

const Auth_URL = '/auth'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: data => ({
        url: `${Auth_URL}/login`,
        method: 'POST',
        body: data,
        serviceKey: 'authService',
        credentials: 'include'
      })
    }),
    signupRecruiter: builder.mutation({
      query: data => ({
        url: `${Auth_URL}/recruiter/signup`,
        method: 'POST',
        body: data,
        serviceKey: 'authService',
        credentials: 'include'
      })
    }),credentials: 'include',
    signupApplicant: builder.mutation({
      query: data => ({
        url: `${Auth_URL}/applicant/signup`,
        method: 'POST',
        body: data,
        serviceKey: 'authService',
        credentials: 'include'
      })
    }),
    signupAdmin: builder.mutation({
      query: data => ({
        url: `${Auth_URL}/admin/signup`,
        method: 'POST',
        body: data,
        serviceKey: 'authService',
        credentials: 'include'
      })
    }),
    validateToken: builder.mutation({
      query: data => ({
        url: `${Auth_URL}/validateToken`,
        method: 'POST',
        body: data,
        serviceKey: 'authService',
        credentials: 'include'
      })
    }),
    resetPassword: builder.mutation({
      query: data => ({
        url: `${Auth_URL}/resetPassword`,
        method: 'POST',
        body: data,
        serviceKey: 'authService',
        credentials: 'include'
      })
    }),
    forgotPassword: builder.mutation({
      query: data => ({
        url: `${Auth_URL}/forgotPassword`,
        method: 'POST',
        body: data,
        serviceKey: 'authService',
        credentials: 'include'
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${Auth_URL}/logout`,
        method: 'POST',
        serviceKey: 'authService',
        credentials: 'include'
      })
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `${Auth_URL}/all-users/`,
        method: 'GET',
        serviceKey: 'authService',
        credentials: 'include'
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users', id })),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    deleteUser: builder.mutation({
      query: deleteUserId => ({
        url: `${Auth_URL}/delete-user/${deleteUserId}`,
        method: 'DELETE',
        serviceKey: 'authService',
        credentials: 'include'
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    getCurrentUser: builder.query({
      query: (userId) => ({
        url: `${Auth_URL}/current-user-details/${userId}`,
        method: 'GET',
        serviceKey: 'authService',
        credentials: 'include'
      }),
      
    }),
    updateUserProfile: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${Auth_URL}/update-profile/${userId}`,
        method: 'PATCH',
        body: data,
        serviceKey: 'authService',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    updateUserPassword: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${Auth_URL}/update-password/${userId}`,
        method: 'PATCH',
        body: data,
        serviceKey: 'authService',
        credentials: 'include',
      })
    })
  })
})

export const {
  useSignupRecruiterMutation,
  useSignupApplicantMutation,
  useSignupAdminMutation,
  useLoginUserMutation,
  useValidateTokenMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
  useUpdateUserProfileMutation,
  useUpdateUserPasswordMutation
} = authApiSlice

// /delete-user/:id
