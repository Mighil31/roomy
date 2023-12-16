import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { store, type RootState } from "../store";

interface SetCredentialsPayload {
  userId: string;
  name: string;
  accessToken: string;
}

interface User {
  userId: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: (() => {
    const storedToken = localStorage.getItem("jwtToken");
    return storedToken ? storedToken : null;
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<SetCredentialsPayload>) {
      const { userId, name, accessToken } = action.payload;
      state.user = { userId, name };
      state.token = accessToken;
      localStorage.setItem("jwtToken", accessToken);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("jwtToken");
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectCurrentToken = (state: RootState) => state.auth.token;

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
