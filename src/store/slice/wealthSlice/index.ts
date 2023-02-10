import { createSlice } from "@reduxjs/toolkit";
import { WealthReduxState } from "../types";

const initialState: WealthReduxState = {
  totalBalanceInUSD: 0,
};

export const wealthSlice = createSlice({
  name: "wealth",
  initialState,
  reducers: {
    setTotalBalanceInUSD: (state, action) => {
      state.totalBalanceInUSD = action.payload;
    },
  },
});

export const { setTotalBalanceInUSD } = wealthSlice.actions;

export default wealthSlice.reducer;
