import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authenticationReducer from "../features/auth/authSlice";
import roleReducer from "../features/auth/roleSlice";
import videoReducer from "../features/videos/videoSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authentication: authenticationReducer,
    videos: videoReducer,
    roles: roleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
