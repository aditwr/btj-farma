import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./dashboard/userInfoSlice";

const store = configureStore({
  reducer: {
    user: userInfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
