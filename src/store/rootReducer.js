import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "store/slices/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
