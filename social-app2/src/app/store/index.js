import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/authFeature/state/authSlice";
import userReducer from "../../features/userFeature/state/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});
