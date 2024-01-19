import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface IUser {
  exp: number;
  iat: number;
  role: string;
  userId: string;
}

interface IAuthState {
  user: null | IUser;
  token: null | string;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login
    setUser: (state, { payload }) => {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
    },

    // logout
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
