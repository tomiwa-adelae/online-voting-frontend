import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const currentUserCookie = Cookies.get("currentUser");
const token = Cookies.get("token");
const userDetails = currentUserCookie ? JSON.parse(currentUserCookie) : null;

const initialState = {
  currentUser: userDetails,
  isAuthenticated: token ? true : false,
  userType: null,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    autenticated: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.userType = null;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { autenticated, logout, setUserType } = authSlice.actions;

export default authSlice.reducer;
