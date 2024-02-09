import { apiSlice } from "../api/apiSlice";

const videosApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getVideoList: bulider.query({
      query: () => ({
        url: "/allproduct/show",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetVideoListQuery } = videosApi;
