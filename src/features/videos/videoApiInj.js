import { apiSlice } from "../api/apiSlice";

const videosApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getVideoList: bulider.query({
      query: () => ({
        url: "/video/list",
        method: "GET",
      }),
      providesTags: ["Videos"],
    }),
    addVideo: bulider.mutation({
      query: (data) => ({
        url: "/add/video",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    deleteVideos: bulider.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addRegisterUser"],
    }),
    updateVideos: bulider.mutation({
      query: (data) => ({
        url: "/user/edit",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["addRegisterUser"],
    }),
  }),
});

export const {
  useGetVideoListQuery,
  useAddVideoMutation,
  useDeleteVideosMutation,
  useUpdateVideosMutation,
} = videosApi;
