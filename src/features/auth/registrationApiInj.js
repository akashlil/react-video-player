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
    }),
    loginUser: bulider.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    }),
    getUserEmail: bulider.query({
      query: () => ({
        url: `/user/admin@gamil.com`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddRegisterUserMutation, useLoginUserMutation } =
  registerUserApi;
