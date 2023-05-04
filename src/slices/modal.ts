import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type ModalTypes =
  | "selectPlaylist"
  | "createPlaylist"
  | "createRoom"
  | "Transfer"
  | "";

interface InitialStateType {
  current: ModalTypes;
  props: { [key: string]: any };
}

const initialState: InitialStateType = {
  current: "",
  props: {},
};

export const selectModal = (state: RootState) => state.modal;

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (
      state,
      action: { payload: { name: ModalTypes; props?: Object } }
    ) => {
      state.current = action.payload.name;
      if (action.payload.props) {
        state.props = action.payload.props;
      }
    },
    hideModal: (state) => {
      return initialState;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
