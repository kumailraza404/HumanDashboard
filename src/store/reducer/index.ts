import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import  counterSlice  from "../slice/counterSlice";
import userSlice from "../slice/userSlice";

// import appReducer from "store/slices/appSlice";
// import walletReducer from "store/slices/walletSlice";

const storage = require("redux-persist/lib/storage").default;

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const reducers = combineReducers({
  counter: counterSlice,
  user: userSlice
});

export const persistedReducer = persistReducer(persistConfig, reducers);

export type RootState = ReturnType<typeof reducers>;
