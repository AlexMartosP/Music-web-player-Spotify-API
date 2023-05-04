import { AnyAction, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "../slices/auth";
import playbarSlice from "../slices/playbar";
import remoteSlice from "../slices/remote";
import modalSlice from "../slices/modal";

const store = configureStore({
  reducer: {
    auth: authSlice,
    playbar: playbarSlice,
    remote: remoteSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
