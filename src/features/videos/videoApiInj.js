import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getVideoList: bulider.query({
      query: () => ({
        url: "/video/list",
        method: "GET",
      }),
      providesTags: ["Videos"],
    }),
    getSingalVideo: bulider.query({
      query: (id) => ({
        url: `/singal/video/${id}`,
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
        url: `/delete/video/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
    updateVideos: bulider.mutation({
      query: (data) => ({
        url: "/edit/video",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideoListQuery,
  useAddVideoMutation,
  useDeleteVideosMutation,
  useUpdateVideosMutation,
  useGetSingalVideoQuery,
} = videosApi;
