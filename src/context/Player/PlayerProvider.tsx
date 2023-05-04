import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// Redux
import { selectIsActive, selectPlaybar } from "../../slices/playbar";
import { useAppSelector } from "../../store/hooks";
// Hooks
import usePlayerActions from "./hooks/usePlayerActions";
import usePlayerConnection from "./hooks/usePlayerConnection";
// Helpers
import isInputField from "../../helpers/isInputField";

export interface PlayerContextType {
  isInitLoading: boolean;
  playerActions: ReturnType<typeof usePlayerActions>;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

function PlayerProvider({ children }: PropsWithChildren) {
  const playerRef = useRef<Spotify.Player | null>(null);
  const isActive = useAppSelector(selectIsActive);
  const playerActions = usePlayerActions(playerRef);
  const isInitLoading = usePlayerConnection(playerRef);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.key === " " || e.key === "Spacebar") &&
        !isInputField(e.target as HTMLElement)
      ) {
        playerActions.togglePlay();
      }
    }

    if (isActive) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  const value = useMemo(() => {
    return {
      isInitLoading,
      playerActions,
    };
  }, [isInitLoading]);

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext) as PlayerContextType;
}

export default PlayerProvider;
