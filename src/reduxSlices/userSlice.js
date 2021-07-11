import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthorised: false,
    token: "",
    user: {
      _id: "",
      email: "",
      name: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthorised = true;
      state.token = action.payload.token;
      state.user._id = action.payload.user._id;
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    },
    clearUser: (state) => {
      state.isAuthorised = false;
      state.token = "";
      state.user._id = "";
      state.user.name = "";
      state.user.email = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
