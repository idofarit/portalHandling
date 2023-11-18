import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./AlertSlice";
import notificationReducer from "./NotificationSlice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    notifications: notificationReducer,
  },
});

export default store;
