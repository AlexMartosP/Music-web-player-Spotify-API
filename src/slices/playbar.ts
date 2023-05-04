import { AnyAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
// Redux
import type { AppThunk, RootState } from "../store/store";
import { seekRemote, toggleRemotePlay, updateRemoteTrack } from "./remote";
// Context
import { enqueueMessage } from "../context/Snackbar/SnackbarProvider";
// Config
import { base_api_url } from "../config/api";
// Services
import { fetcher } from "../services/fetcher";
import mutateFetcher from "../services/mutateFetcher";
// Types
import { InitialStateType, PlayStateType, RepeatType } from "../types/playbar";

const initialState: InitialStateType = {
  isActive: false,
  deviceId: "",
  currentTrack: {
    uri: "",
    uid: "",
    id: "",
    type: "track",
    media_type: "audio",
    name: "",
    is_playable: false,
    album: {
      uri: "",
      name: "",
      images: [{ url: "" }],
    },
    artists: [],
    duration_ms: 0,
    track_type: "audio",
    linked_from: {
      uri: null,
      id: null,
    },
  },
  nextTrack: [],
  previousTrack: [],
  playState: {
    isPaused: false,
    isShuffle: false,
    repeatMode: 0,
    position: 0,
    duration: 0,
  },
  player: {},
};

// Selectors
export const selectPlaybar = (state: RootState) => state.playbar;
export const selectIsActive = (state: RootState) => state.playbar.isActive;
export const selectCurrentTrack = (state: RootState) =>
  state.playbar.currentTrack;

const playbarSlice = createSlice({
  name: "playbar",
  initialState,
  reducers: {
    update_current_track: (state, action: { payload: Spotify.Track }) => {
      state.currentTrack = action.payload;
    },
    update_next_tracks: (state, action: { payload: Spotify.Track[] }) => {
      state.nextTrack = action.payload;
    },
    update_previous_tracks: (state, action: { payload: Spotify.Track[] }) => {
      state.previousTrack = action.payload;
    },
    update_playstate: (state, action: { payload: PlayStateType }) => {
      state.playState = action.payload;
    },
    update_device: (state, action) => {
      state.deviceId = action.payload;
    },
    update_status: (state, action: { payload: boolean }) => {
      state.isActive = action.payload;
    },
    deactivate: (state) => {
      state.isActive = false;
    },
  },
});

// Thunks
export const load =
  (deviceId: string): AppThunk =>
  async (dispatch) => {
    dispatch(update_device(deviceId));

    const availableDevices = await fetcher({
      urls: base_api_url + "/me/player/devices",
    });

    if (
      availableDevices.devices.length === 1 &&
      availableDevices.devices[0].id === deviceId
    ) {
      dispatch(transfer(deviceId));
    }
  };

export const transfer =
  (deviceId: string): AppThunk<Promise<any>> =>
  async (dispatch, getState) => {
    const { playbar } = getState();

    return mutateFetcher(base_api_url + `/me/player`, "PUT", {
      device_ids: [deviceId],
    }).then(() => {
      if (deviceId === playbar.deviceId) {
        dispatch(update_status(true));
      }
    });
  };

export const playTrack =
  (contextURI?: string, uri?: string, index?: number): AppThunk =>
  async (dispatch) => {
    // Only if moderator
    if (uri) {
      dispatch(updateRemoteTrack(uri));
    }

    mutateFetcher(base_api_url + `/me/player/play`, "PUT", {
      ...(contextURI
        ? { context_uri: contextURI, offset: { position: `${index}` } }
        : { uris: [uri] }),
    });
  };

export const playSeekTrack =
  (
    position: number,
    uri?: string,
    contextURI?: string,
    index?: number
  ): AppThunk<Promise<undefined>> =>
  async (dispatch) => {
    // Only if moderator
    if (uri) {
      dispatch(updateRemoteTrack(uri));
    }

    await mutateFetcher(base_api_url + `/me/player/play`, "PUT", {
      ...(contextURI
        ? { context_uri: contextURI, offset: { position: `${index}` } }
        : { uris: [uri] }),
      position_ms: position,
    });

    return undefined;
  };

export const playShuffle =
  (contextURI: string, numberOfTracks: number): AppThunk =>
  async (dispatch, getState) => {
    const { playbar } = getState();
    const randomIndex = Math.floor(Math.random() * (numberOfTracks - 1));

    mutateFetcher(base_api_url + `/me/player/play`, "PUT", {
      context_uri: contextURI,
      offset: {
        position: randomIndex.toString(),
      },
    });

    if (!playbar.playState.isShuffle) {
      dispatch(toggleShuffle());
    }
  };

export const togglePlay =
  (forcePause?: boolean): AppThunk =>
  async (dispatch, getState) => {
    const { playbar } = getState();

    // Only if moderator
    dispatch(toggleRemotePlay());

    if (playbar.playState.isPaused && !forcePause) {
      mutateFetcher(base_api_url + `/me/player/play`, "PUT");
    } else {
      mutateFetcher(base_api_url + `/me/player/pause`, "PUT");
    }
  };

export const skipToNext = (): AppThunk => async () => {
  mutateFetcher(base_api_url + `/me/player/next`, "POST");
};

export const skipToPrev = (): AppThunk => async () => {
  mutateFetcher(base_api_url + `/me/player/previous`, "POST");
};

export const seek =
  (seekValue: number): AppThunk =>
  async (dispatch) => {
    dispatch(seekRemote(seekValue));

    mutateFetcher(
      base_api_url + `/me/player/seek?position_ms=${seekValue}`,
      "PUT"
    );
  };

export const toggleShuffle = (): AppThunk => async (dispatch, getState) => {
  const { playbar } = getState();

  mutateFetcher(
    base_api_url + `/me/player/shuffle?state=${!playbar.playState.isShuffle}`,
    "PUT"
  );
};

export const changeRepeatMode = (): AppThunk => async (dispatch, getState) => {
  const {
    playbar: { playState },
  } = getState();

  let mode = 0;
  switch (playState.repeatMode + 1) {
    case 1:
      mode = 1;
      break;
    case 2:
      mode = 2;
    case 3:
      mode = 0;
  }

  mutateFetcher(
    base_api_url + `/me/player/repeat?state=${RepeatType[mode]}`,
    "PUT"
  );
};

export const addToQueue =
  (uri: string): AppThunk =>
  async () => {
    mutateFetcher(base_api_url + `/me/player/queue?uri=${uri}`, "POST").then(
      () => {
        enqueueMessage({ body: "Track added to queue", type: "INFO" });
      }
    );
  };

export const {
  update_current_track,
  update_next_tracks,
  update_previous_tracks,
  update_device,
  update_playstate,
  update_status,
  deactivate,
} = playbarSlice.actions;
export default playbarSlice.reducer;
