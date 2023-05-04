import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "react-feather";
import { RepeatType } from "../../../../types/playbar";
import { Wrapper } from "./TrackActions.styles";
import { ActionButton } from "../../Playbar.styles";
import { MouseEvent } from "react";

interface TrackActionsProps {
  isShuffle: boolean;
  isPaused: boolean;
  repeatMode: RepeatType;
  isDisabled: boolean;
  handleShuffle: () => void;
  handleToPrev: () => void;
  handlePlayPause: () => void;
  handleToNext: () => void;
  handleRepeat: () => void;
}

function TrackActions({
  isShuffle,
  isPaused,
  repeatMode,
  isDisabled,
  handlePlayPause,
  handleRepeat,
  handleShuffle,
  handleToNext,
  handleToPrev,
}: TrackActionsProps) {
  function preventPropegation(e: MouseEvent, callback: () => void) {
    e.stopPropagation();
    callback();
  }

  let color = "#fff";
  if (repeatMode === 1) {
    color = "#00D1FF";
  } else if (repeatMode === 2) {
    color = "red";
  }
  return (
    <Wrapper>
      <button
        className="reset-button"
        disabled={isDisabled}
        onClick={(e) => preventPropegation(e, handleShuffle)}
      >
        <Shuffle color={isShuffle ? "#00D1FF" : "#fff"} />
      </button>
      <button
        className="reset-button"
        disabled={isDisabled}
        onClick={(e) => preventPropegation(e, handleToPrev)}
      >
        <SkipBack />
      </button>
      <ActionButton
        onClick={(e) => preventPropegation(e, handlePlayPause)}
        disabled={isDisabled}
      >
        {isPaused ? (
          <Play style={{ transform: "translateX(2px)" }} />
        ) : (
          <Pause />
        )}
      </ActionButton>
      <button
        className="reset-button"
        disabled={isDisabled}
        onClick={(e) => preventPropegation(e, handleToNext)}
      >
        <SkipForward />
      </button>
      <button
        className="reset-button"
        disabled={isDisabled}
        onClick={(e) => preventPropegation(e, handleRepeat)}
      >
        <Repeat color={color} />
      </button>
    </Wrapper>
  );
}

export default TrackActions;
