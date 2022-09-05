import { configureStore } from "@reduxjs/toolkit";
import userListReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    users: userListReducer,
  },
});
