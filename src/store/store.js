import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import authReducer from "./slices/authSlice";
// import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: true,
});
