/* eslint-disable @typescript-eslint/no-restricted-imports */
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// import { PERSIST } from "redux-persist";
import { persistedReducer, RootState } from "./reducer";

export const store = configureStore({
  reducer: persistedReducer,
});

type AppDispatch = typeof store.dispatch;

const developmentDispatch: () => AppDispatch = useDispatch;

export const useAppDispatch = developmentDispatch;
export const developmentSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppSelector = developmentSelector;
