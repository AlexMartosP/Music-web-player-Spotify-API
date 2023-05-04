import { MutableRefObject, useEffect, useRef, useState } from "react";
// SWR
import useSWRImmutable from "swr/immutable";
// Redux
import { checkSavedTracks } from "../../../services/URLCreators";
import { leaveRoom, updateRemoteTrack } from "../../../slices/remote";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  deactivate,
  load,
  selectPlaybar,
  update_current_track,
  update_next_tracks,
  update_playstate,
  update_previous_tracks,
  update_status,
} from "../../../slices/playbar";
// Hooks
import useAuth from "../../../hooks/useAuth";
// Services
import { flatFetcher } from "../../../services/fetcher";
import { refreshToken } from "../../../services/auth";
// Utils
import Timer from "../../../utils/timer";
// Types
import { AccesTokenStorage } from "../../../types/auth";

function usePlayerConnection(
  localVolume: number,
  playerRef: MutableRefObject<Spotify.Player | null>
) {
  const [isInitLoading, setIsInitLoading] = useState(true);
  const playbar = useAppSelector(selectPlaybar);
  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const { mutate: savedMutate } = useSWRImmutable(
    playbar.currentTrack?.id && {
      type: "savings",
      key: playbar.currentTrack.id,
      urls: checkSavedTracks([playbar.currentTrack.id]),
    },
    flatFetcher,
    { revalidateIfStale: false, revalidateOnMount: false }
  );
  const currentTrackId = useRef<string | null>(null);

  function tryMutate(newID: string) {
    if (currentTrackId.current !== newID) {
      savedMutate();
    }
  }

  function tryUpdateRoom(currentTrack: Spotify.Track) {
    if (currentTrackId.current !== currentTrack.id) {
      dispatch(updateRemoteTrack(currentTrack.uri, 0));
    }
  }

  useEffect(() => {
    if (!playerRef.current) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      document.body.append(script);
      let player: Spotify.Player;

      window.onSpotifyWebPlaybackSDKReady = () => {
        player = new Spotify.Player({
          name: "Alex web listener",
          getOAuthToken: async (cb) => {
            const accesToken: AccesTokenStorage = JSON.parse(
              localStorage.getItem("access_token")!
            );
            if (accesToken.expires_at > Date.now()) {
              cb(accesToken.token);
            } else {
              const localRefreshToken = localStorage.getItem("refresh_token");
              if (localRefreshToken) {
                const tokenData = await refreshToken(localRefreshToken);
                cb(tokenData.acces_token);

                localStorage.setItem(
                  "access_token",
                  JSON.stringify({
                    token: tokenData.access_token,
                    expires_at: tokenData.expires_in * 1000 + Date.now(),
                  })
                );
                localStorage.setItem("refresh_token", tokenData.refresh_token);
              } else {
                logout();
              }
            }
          },
          volume: localVolume,
        });

        player.addListener("ready", async ({ device_id }) => {
          dispatch(load(device_id));
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("not ready" + device_id);
        });

        // Runs when this app is the active device
        player.addListener("player_state_changed", (args) => {
          // If this device is still active
          if (args.playback_id) {
            // Update state
            dispatch(
              update_playstate({
                isPaused: args.paused,
                isShuffle: args.shuffle,
                duration: args.duration,
                position: args.position,
                repeatMode: args.repeat_mode,
              })
            );
            dispatch(update_current_track(args.track_window.current_track));
            dispatch(update_next_tracks(args.track_window.next_tracks));
            dispatch(update_previous_tracks(args.track_window.previous_tracks));

            // Update room if the user is moderator of a room
            tryUpdateRoom(args.track_window.current_track);

            // Mutate the currently playing tracks saved state
            tryMutate(args.track_window.current_track.id as string);

            if (!args.paused) {
              if (
                args.track_window.current_track.id !== currentTrackId.current
              ) {
                Timer.setTime(0);
              } else {
                Timer.start(args.position);
              }
            } else {
              Timer.stop();
              Timer.setTime(args.position);
            }
            currentTrackId.current = args.track_window.current_track.id;

            if (isInitLoading) {
              dispatch(update_status(true));
              setIsInitLoading(false);
            }
          } else {
            dispatch(deactivate());
            dispatch(leaveRoom());
            Timer.stop();
          }
        });

        playerRef.current = player;
        player.connect();
      };

      return () => {
        player?.disconnect();
      };
    }
  }, []);

  return isInitLoading;
}

export default usePlayerConnection;
