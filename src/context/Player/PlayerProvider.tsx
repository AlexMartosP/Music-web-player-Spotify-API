import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// Redux
import { selectPlaybar } from "../../slices/playbar";
import { useAppSelector } from "../../store/hooks";
// Hooks
import usePlayerActions from "./hooks/usePlayerActions";
import usePlayerConnection from "./hooks/usePlayerConnection";
// Helpers
import isInputField from "../../helpers/isInputField";

export interface PlayerContextType {
  handleVolumeChange: (newVolume: number) => void;
  localVolume: number;
  isInitLoading: boolean;
  playerActions: ReturnType<typeof usePlayerActions>;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

function PlayerProvider({ children }: PropsWithChildren) {
  const playerRef = useRef<Spotify.Player | null>(null);

  const [localVolume, setLocalVolume] = useState(0.5);
  const playbar = useAppSelector(selectPlaybar);
  const playerActions = usePlayerActions(playerRef);
  const isInitLoading = usePlayerConnection(localVolume, playerRef);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setLocalVolume(newVolume);
    playerRef.current?.setVolume(newVolume);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.key === " " || e.key === "Spacebar") &&
        !isInputField(e.target as HTMLElement)
      ) {
        playerActions.togglePlay();
      }
    }

    if (playbar.isActive) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playbar.isActive]);

  return (
    <PlayerContext.Provider
      value={{
        handleVolumeChange,
        localVolume,
        isInitLoading,
        playerActions,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext) as PlayerContextType;
}

export default PlayerProvider;
