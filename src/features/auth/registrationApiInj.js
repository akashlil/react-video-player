import { apiSlice } from "../api/apiSlice";

const registerUserApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    addRegisterUser: bulider.mutation({
      query: (data) => ({
        url: "/admin/add",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["addRegisterUser"],
    }),
    updateRegisterUser: bulider.mutation({
      query: (data) => ({
        url: "/admin/edit",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["addRegisterUser"],
    }),
    deleteRegisterUser: bulider.mutation({
      query: (id) => ({
        url: `/admin/delete/${id}`,
        method: "DELETE",
        // headers: { "Content-Type": "application/json" },
        // body: id,
      }),
      invalidatesTags: ["addRegisterUser"],
    }),
    loginUser: bulider.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    }),
    getAllUser: bulider.query({
      query: () => ({
        url: `/admin/all`,
        method: "GET",
      }),
      providesTags: ["addRegisterUser"],
    }),
  }),
});

export const {
  useAddRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUserQuery,
  useUpdateRegisterUserMutation,
  useDeleteRegisterUserMutation,
} = registerUserApi;
