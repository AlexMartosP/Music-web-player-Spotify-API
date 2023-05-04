import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface InitialStateType {
  loading: boolean;
  loggingIn: boolean;
  error: string | { status: number; error_description: string };
  user: UserType | null;
}

interface UserType {
  id: string;
  display_name: string;
  images: SpotifyApi.ImageObject[];
  product: string;
  country: string;
  externalUrl: string;
}

const initialState: InitialStateType = {
  loading: true,
  loggingIn: false,
  error: "",
  user: null,
};

export const selectAuth = (state: RootState) => {
  return state.auth;
};

export const selectLoading = (state: RootState) => {
  return state.auth.loading;
};

export const selectCurrentUser = (state: RootState) => {
  return state.auth.user!;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth_started: (state) => {
      state.loading = true;
    },
    auth_logginIn: (state) => {
      state.loggingIn = true;
    },
    auth_success: (state, action) => {
      const user = action.payload as SpotifyApi.UserObjectPrivate;

      state.loading = false;
      state.loggingIn = false;
      state.user = {
        id: user.id,
        display_name: user.display_name || "",
        images: user.images || [],
        product: user.product,
        country: user.country,
        externalUrl: user.external_urls.spotify,
      };
    },
    auth_end: (state) => {
      state.loading = false;
    },
    auth_error: (state, action) => {
      state.loading = false;
      state.loggingIn = false;
      state.error = action.payload;
    },
    auth_logout: (state) => {
      state.user = initialState.user;
    },
  },
});

export const {
  auth_logout,
  auth_started,
  auth_end,
  auth_success,
  auth_error,
  auth_logginIn,
} = authSlice.actions;

export default authSlice.reducer;
