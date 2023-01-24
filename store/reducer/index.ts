import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import  counterSlice  from "../slice/counterSlice";

// import appReducer from "store/slices/appSlice";
// import walletReducer from "store/slices/walletSlice";

const storage = require("redux-persist/lib/storage").default;

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["counter"],
};

const reducers = combineReducers({
  counter: counterSlice,
});

export const persistedReducer = persistReducer(persistConfig, reducers);

export type RootState = ReturnType<typeof reducers>;
