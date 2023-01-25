import { createSlice } from "@reduxjs/toolkit";
import {  UserReduxState } from "../types";

const initialState: UserReduxState = {
  email: '',
  name:'',
  picture:'',
  isSignedIn: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
        state.name = action.payload
    },
    setEmail: (state, action) => {
        state.email  = action.payload
    },
    setPicture: (state, action) => {
        state.picture = action.payload
    },
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload
    }
  },
});

export const {
    setName, setEmail, setPicture, setIsSignedIn
} = userSlice.actions;

export default userSlice.reducer;