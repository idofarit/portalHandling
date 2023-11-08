import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./AlertSlice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
  },
});

export default store;
