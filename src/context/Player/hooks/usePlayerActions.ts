import { MutableRefObject } from "react";
import {
  addToQueue as addToQueueThunk,
  changeRepeatMode as changeRepeatModeThunk,
  playSeekTrack as playSeekTrackThunk,
  playShuffle as playShuffleThunk,
  playTrack as playTrackThunk,
  toggleShuffle as toggleShuffleThunk,
  update_volume,
} from "../../../slices/playbar";
import { seekRemote, toggleRemotePlay } from "../../../slices/remote";
import { useAppDispatch } from "../../../store/hooks";

function usePlayerActions(playerRef: MutableRefObject<Spotify.Player | null>) {
  const dispatch = useAppDispatch();

  const activateElement = () => {
    playerRef.current?.activateElement();
  };

  const playTrack = (contextURI?: string, uri?: string, index?: number) => {
    dispatch(playTrackThunk(contextURI, uri, index));
  };

  const playSeekTrack = async (
    position: number,
    uri?: string,
    contextURI?: string,
    index?: number
  ) => {
    return dispatch(playSeekTrackThunk(position, uri, contextURI, index));
  };

  const playShuffle = (contextURI: string, numberOfTracks: number) => {
    dispatch(playShuffleThunk(contextURI, numberOfTracks));
  };

  const resume = () => {
    return playerRef.current?.resume();
  };

  const togglePlay = (forcePause?: boolean) => {
    // Only if moderator
    dispatch(toggleRemotePlay());

    if (!forcePause) {
      playerRef.current?.togglePlay();
    } else {
      playerRef.current?.pause();
    }
  };

  const skipToNext = () => {
    playerRef.current?.nextTrack();
  };

  const skipToPrev = () => {
    playerRef.current?.previousTrack();
  };

  const seek = (seekValue: number) => {
    dispatch(seekRemote(seekValue));

    playerRef.current?.seek(seekValue);
  };

  const toggleShuffle = () => {
    dispatch(toggleShuffleThunk());
  };

  const changeRepeatMode = () => {
    dispatch(changeRepeatModeThunk());
  };

  const addToQueue = (uri: string) => {
    dispatch(addToQueueThunk(uri));
  };

  const setVolume = (newVolume: number) => {
    dispatch(update_volume(newVolume));
    playerRef.current?.setVolume(newVolume);
  };

  return {
    activateElement,
    resume,
    playSeekTrack,
    playShuffle,
    playTrack,
    seek,
    skipToNext,
    skipToPrev,
    addToQueue,
    changeRepeatMode,
    toggleShuffle,
    togglePlay,
    setVolume,
  };
}

export default usePlayerActions;
