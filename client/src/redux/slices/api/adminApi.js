import { apiSlice } from '../apiSlice'

const ADMIN_URL = '/admin'

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllAdmins: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/get-all-admins/`,
        method: 'GET',
        serviceKey: 'adminService',
        credentials: 'include'
      }),
      providesTags: result =>
        result && result.jobs
          ? [
              ...result.jobs.map(({ id }) => ({ type: 'Admins', id })),
              { type: 'Admins', id: 'LIST' }
            ]
          : [{ type: 'Admins', id: 'LIST' }]
    }),
    deleteAdmin: builder.mutation({
      query: deleteAdminId => ({
        url: `${ADMIN_URL}/delete-admin/${deleteAdminId}`,
        method: 'DELETE',
        serviceKey: 'adminService',
        credentials: 'include'
      }),
      invalidatesTags: [{ type: 'Admins', id: 'LIST' }]
    })
  })
})


export const { useGetAllAdminsQuery,useDeleteAdminMutation } = adminApiSlice
