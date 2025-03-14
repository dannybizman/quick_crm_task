import { createSlice } from "@reduxjs/toolkit";
import { setButtonLoading } from "./loadersSlice";

// Define Initial State
const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
};

// Create Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log("loginSuccess reducer triggered:", action.payload);
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.error = null;
    },
    loginFailure(state, action) {
      console.log("loginFailure reducer triggered:", action.payload);
      state.error = action.payload;
    },
    logoutUser(state) {
      console.log("logoutUser reducer triggered");
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { loginSuccess, loginFailure, logoutUser } = usersSlice.actions;
export default usersSlice.reducer;
