// authenticationSlice.js
import { createSlice } from "@reduxjs/toolkit"; // Import the setUserRole action

const initialState = {
  video_title: "",
  video_url: "",
  video_details: "",
  video_thumbnail: "",

  loading: false,
  error: null,
  successMessage: null,
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    Videos(state) {},
  },
});

export const { Videos } = videosSlice.actions;

export default videosSlice.reducer;
