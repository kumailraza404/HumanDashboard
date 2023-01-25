import { createSlice } from "@reduxjs/toolkit";
import { AppReduxState } from "../types";

const initialState: AppReduxState = {
  value: 0
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
        state.value += 1
      },
      decrement: (state, action) => {
        state.value -= 1
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload
      }
  },
});

export const {
  increment, decrement, incrementByAmount
} = counterSlice.actions;

export default counterSlice.reducer;
