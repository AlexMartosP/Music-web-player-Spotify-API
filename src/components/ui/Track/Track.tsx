import { MouseEvent, useRef } from "react";
import useTrack from "../../../hooks/useTrack";

import { Wrapper } from "./Track.styles";

interface TrackProps {
  currentPosition: number; // Percentage
  vertical?: boolean;
  isDisabled: boolean;
  handleChange: (newPart: number) => void;
  handleEnd: (newPart: number) => void;
}

// Should get start position to set to state
// That start pos comes from parent from API
function Track({
  currentPosition,
  vertical = false,
  handleChange,
  handleEnd,
  isDisabled,
}: TrackProps) {
  const trackerRef = useRef<HTMLDivElement>(null);
  const { handleTrackerClick, handleDragStart } = useTrack(
    trackerRef,
    handleChange,
    handleEnd,
    vertical
  );

  function tryTrackClick(e: MouseEvent) {
    if (!isDisabled) {
      handleTrackerClick(e);
    }
  }

  return (
    <Wrapper onClick={tryTrackClick} ref={trackerRef} vertical={vertical}>
      <div
        className={`tracker ${vertical ? "vertical" : ""}`}
        data-disabled={isDisabled}
      >
        {!isDisabled && (
          <div
            className={`progress ${vertical ? "vertical" : ""}`}
            style={{
              transform: `translateX(${
                !vertical ? -100 + currentPosition + "%" : "0"
              }) translateY(${vertical ? 100 - currentPosition + "%" : "0"})`,
            }}
            data-disabled={isDisabled}
          ></div>
        )}
      </div>
      {!isDisabled && (
        <div
          className={`thumb dot ${vertical ? "vertical" : ""}`}
          style={{
            left: !vertical ? currentPosition + "%" : "auto",
            bottom: !vertical ? "100%" : currentPosition + "%",
          }}
          data-disabled={isDisabled}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
      )}
    </Wrapper>
  );
}

export default Track;
