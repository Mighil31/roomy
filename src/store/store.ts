import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import { postApi } from "./apis/postApi";
// import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    post: postReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(postApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
