import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// import { PERSIST } from "redux-persist";
import { persistedReducer, RootState } from "./reducer";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

type AppDispatch = typeof store.dispatch;

const developmentDispatch: () => AppDispatch = useDispatch;

export const useAppDispatch = developmentDispatch;
export const developmentSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppSelector = developmentSelector;
