import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "./dialogSlice";
import { userApi } from "./userApi";
import usersReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    dialog: dialogReducer,
    userApi: userApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(userApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
