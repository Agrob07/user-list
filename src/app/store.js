import { configureStore } from "@reduxjs/toolkit";
import userListReducer from "../features/counter/usersSlice";

export const store = configureStore({
  reducer: {
    users: userListReducer,
  },
});
