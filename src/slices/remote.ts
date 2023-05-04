import { createSlice } from "@reduxjs/toolkit";
// Firebase
import {
  Unsubscribe,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
// Redux
import { AppThunk, RootState } from "../store/store";
import { playSeekTrack, playTrack, seek, togglePlay } from "./playbar";
// Config
import db from "../config/firebase";
// Constants
import REMOTEACTIONS from "../constants/remote";
// Utils
import Timer from "../utils/timer";
// Types
import {
  CommentType,
  RemoteInitialStateType,
  RoomInfoType,
  RoomType,
} from "../types/remote";

const initialState: RemoteInitialStateType = {
  isRemote: false,
  isListener: false,
  isModerator: false,
  roomInfo: {
    id: "",
    name: "",
    description: "",
    comment: null,
    moderator: {
      name: "",
    },
    listeners: 0,
    isPaused: false,
  },
  joinedAt: null,
};

// Selectors
export const selectRemote = (state: RootState) => state.remote;
export const selectRemoteComment = (state: RootState) =>
  state.remote.roomInfo.comment;
export const selectIsRemote = (state: RootState) => state.remote.isRemote;

const remoteSlice = createSlice({
  name: "remote",
  initialState,
  reducers: {
    set_to_listener: (state) => {
      state.isRemote = true;
      state.isListener = true;
      state.joinedAt = Date.now();
    },
    set_to_moderator: (state) => {
      state.isRemote = true;
      state.isModerator = true;
      state.joinedAt = Date.now();
    },
    set_room_info: (state, action: { payload: RoomInfoType }) => {
      state.roomInfo = action.payload;
    },
    set_isPaused: (state, action) => {
      state.roomInfo.isPaused = action.payload;
    },
    update_comment: (state, action: { payload: CommentType[] }) => {
      const comments = action.payload;
      const latestComment = comments[comments.length - 1];

      if (comments.length > 0) {
        if (state.roomInfo.comment) {
          if (state.roomInfo.comment.id !== latestComment.id) {
            state.roomInfo.comment = latestComment;
          }
        } else if (latestComment.timestamp >= state.joinedAt!) {
          state.roomInfo.comment = latestComment;
        }
      }
    },
    reset_comment: (state) => {
      state.roomInfo.comment = null;
    },
    update_listeners: (state, action) => {
      state.roomInfo.listeners = action.payload;
    },
    reset_remote: () => {
      return initialState;
    },
  },
});

export const subscribeToRoom =
  (roomId: string, handleEnd: () => void): AppThunk<Promise<Unsubscribe>> =>
  async (dispatch, getState) => {
    const { playbar } = getState();

    // Get documents
    const document = doc(db, "rooms", roomId);
    // Increment on join
    await updateDoc(document, {
      listeners: increment(1),
    });
    const documentData = (await getDoc(document)).data() as RoomType;
    dispatch(
      set_room_info({
        id: document.id,
        name: documentData.name,
        listeners: documentData.listeners,
        description: documentData.description,
        moderator: {
          name: documentData.moderator.name,
        },
        comment: null,
        isPaused: documentData.currentTrack.isPaused,
      })
    );
    dispatch(set_to_listener());

    if (!documentData.currentTrack.isPaused) {
      const position =
        documentData.currentTrack.position +
        (Date.now() - documentData.currentTrack.timestamp);
      dispatch(playSeekTrack(position, documentData.currentTrack.uri));
    } else {
      if (!playbar.player.playState.isPaused) {
        dispatch(togglePlay(true));
      }
    }

    let initilized = false;

    // Listen to changes
    const unsubscribe = onSnapshot(
      document,
      (roomSnapshot) => {
        if (initilized) {
          const roomData = roomSnapshot.data() as RoomType | undefined;

          switch (roomData?.actionType) {
            case REMOTEACTIONS.play_track:
              const { uri } = roomData.currentTrack;
              dispatch(playTrack(undefined, uri));
              dispatch(set_isPaused(false));
              break;
            case REMOTEACTIONS.play:
              dispatch(
                playSeekTrack(
                  roomData.currentTrack.position,
                  roomData.currentTrack.uri
                )
              );
              dispatch(set_isPaused(false));
              break;
            case REMOTEACTIONS.pause:
              dispatch(togglePlay(roomData.currentTrack.isPaused));
              dispatch(set_isPaused(true));
              break;
            case REMOTEACTIONS.seek:
              const { position } = roomData.currentTrack;
              dispatch(seek(position));
              break;
            case REMOTEACTIONS.new_comment:
              dispatch(update_comment(roomData.messages));
              break;
            case REMOTEACTIONS.live_ended:
              handleEnd();
              break;
            default:
              break;
          }

          if (roomData?.listeners) {
            dispatch(update_listeners(roomData.listeners));
          }
        }
        initilized = true;
      },
      () => handleEnd()
    );

    return unsubscribe;
  };

export const subscribeToRoomAsModerator =
  (roomId: string): AppThunk<Promise<Unsubscribe>> =>
  async (dispatch) => {
    const document = doc(db, "rooms", roomId);
    const documentData = (await getDoc(document)).data() as RoomType;
    dispatch(
      set_room_info({
        id: document.id,
        name: documentData.name,
        listeners: documentData.listeners,
        description: documentData.description,
        moderator: {
          name: documentData.moderator.name,
        },
        comment: null,
        isPaused: documentData.currentTrack.isPaused,
      })
    );
    dispatch(set_to_moderator());

    const unsubscribe = onSnapshot(document, (roomSnapshot) => {
      const roomData = roomSnapshot.data() as RoomType | undefined;

      if (roomData?.actionType === REMOTEACTIONS.new_comment) {
        dispatch(update_comment(roomData.messages));
      }

      if (roomData?.listeners) {
        dispatch(update_listeners(roomData.listeners));
      }
    });

    return unsubscribe;
  };

export const syncListener = (): AppThunk => async (dispatch, getState) => {
  const { remote } = getState();
  if (remote.isListener) {
    const document = doc(db, "rooms", remote.roomInfo.id);
    const documentData = (await getDoc(document)).data() as RoomType;

    if (!documentData.currentTrack.isPaused) {
      const position =
        documentData.currentTrack.position +
        (Date.now() - documentData.currentTrack.timestamp);
      dispatch(playSeekTrack(position, documentData.currentTrack.uri));
    } else {
      dispatch(set_isPaused(true));
    }
  }
};

export const leaveRoom =
  (forcedEnd?: boolean): AppThunk =>
  async (dispatch, getState) => {
    const { remote } = getState();
    if (remote.isListener) {
      dispatch(reset_remote());

      if (!forcedEnd) {
        const document = doc(db, "rooms", remote.roomInfo.id);
        updateDoc(document, {
          listeners: increment(-1),
        });
      }
    }
  };

export const sendCommentToRoom =
  (comment: string): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const { remote } = getState();
    if (remote.isRemote) {
      const document = doc(db, "rooms", remote.roomInfo.id);

      await updateDoc(document, {
        messages: arrayUnion({
          id: crypto.randomUUID(),
          body: comment,
          timestamp: Date.now(),
        }),
        actionType: REMOTEACTIONS.new_comment,
      });
    }
  };

export const leaveRoomAsModerator =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const { remote } = getState();
    if (remote.isModerator) {
      const document = doc(db, "rooms", remote.roomInfo.id);
      await updateDoc(document, {
        actionType: REMOTEACTIONS.live_ended,
      });

      await deleteDoc(document);
      dispatch(reset_remote());
    }
  };

export const updateRemoteTrack =
  (uri: string, position?: number): AppThunk =>
  async (dispatch, getState) => {
    const { remote } = getState();
    if (remote.isModerator) {
      await updateDoc(doc(db, "rooms", remote.roomInfo.id), {
        "currentTrack.uri": uri,
        ...((position || position === 0) && {
          "currentTrack.position": position,
          "currentTrack.timestamp": Date.now(),
          "currentTrack.isPaused": false,
        }),
        actionType: REMOTEACTIONS.play_track,
      });
    }
  };

export const toggleRemotePlay = (): AppThunk => async (dispatch, getState) => {
  const { playbar, remote } = getState();
  if (remote.isModerator) {
    await updateDoc(doc(db, "rooms", remote.roomInfo.id), {
      "currentTrack.isPaused": !playbar.player.playState.isPaused,
      "currentTrack.position": Timer.time,
      "currentTrack.timestamp": Date.now(),
      actionType: playbar.player.playState.isPaused
        ? REMOTEACTIONS.play
        : REMOTEACTIONS.pause,
    });
  }
};

export const seekRemote =
  (seekValue: number): AppThunk =>
  async (dispatch, getState) => {
    const { remote } = getState();
    if (remote.isModerator) {
      await updateDoc(doc(db, "rooms", remote.roomInfo.id), {
        "currentTrack.position": seekValue,
        "currentTrack.timestamp": Date.now(),
        actionType: REMOTEACTIONS.seek,
      });
    }
  };

export const {
  set_room_info,
  set_to_listener,
  set_to_moderator,
  update_listeners,
  update_comment,
  reset_remote,
  set_isPaused,
  reset_comment,
} = remoteSlice.actions;
export default remoteSlice.reducer;
