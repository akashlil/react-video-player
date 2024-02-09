// roleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: localStorage.getItem("role") || "",
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setUserRole(state, action) {
      state.userRole = action.payload;
      localStorage.setItem("role", action.payload.role);
    },
    removeUserRole(state) {
      state.userRole = "";
      localStorage.removeItem("role");
    },
  },
});

export const { setUserRole, removeUserRole } = roleSlice.actions;

export default roleSlice.reducer;
