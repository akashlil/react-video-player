import { apiSlice } from "../api/apiSlice";

const registerUserApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    addRegisterUser: bulider.mutation({
      query: (data) => ({
        url: "/user/add",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["addRegisterUser"],
    }),
    updateRegisterUser: bulider.mutation({
      query: (data) => ({
        url: "/user/edit",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["addRegisterUser"],
    }),
    deleteRegisterUser: bulider.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addRegisterUser"],
    }),
    loginUser: bulider.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    }),
    getAllUser: bulider.query({
      query: () => ({
        url: `/user/all`,
        method: "GET",
      }),
      providesTags: ["addRegisterUser"],
    }),
    getSingalUser: bulider.query({
      query: (id) => ({
        url: `/singal/user/${id}`,
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
  useGetSingalUserQuery,
} = registerUserApi;
