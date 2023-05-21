import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    }, loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error=false;
      state.isLoggedIn=true;
    }, loginFailed: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = true;
    }, logOut: (state) => {
      state.isFetching=false;
      state.currentUser=null;
      state.error=false;
      state.isLoggedIn=false;
    }
  }
});

export const { loginStart, loginSuccess, loginFailed, logOut } = userSlice.actions;
export default userSlice.reducer;