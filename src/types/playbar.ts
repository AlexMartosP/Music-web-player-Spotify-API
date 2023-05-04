import { Unsubscribe } from "firebase/firestore";

export enum RepeatType {
  "off",
  "context",
  "track",
}

export interface PlayStateType {
  isPaused: boolean;
  isShuffle: boolean;
  repeatMode: RepeatType;
  position: number;
  duration: number;
}

export interface InitialStateType {
  isActive: boolean;
  deviceId: "";
  currentTrack: Spotify.Track;
  nextTrack: Spotify.Track[];
  previousTrack: Spotify.Track[];
  playState: PlayStateType;
  player: any;
}
