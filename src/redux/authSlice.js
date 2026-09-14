import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const savedUser = localStorage.getItem("babafly-current-user");

const initialState = {
  token: token || null,
  isAuthenticated: token ? true : false,
  user: savedUser ? JSON.parse(savedUser) : null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user || null;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);

      if (action.payload.user) {
        localStorage.setItem(
          "babafly-current-user",
          JSON.stringify(action.payload.user)
        );
      }
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("babafly-current-user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;