import { useEffect, useState } from "react";
// Components
import Track from "../ui/Track";
// Utils
import formatTime from "../../helpers/formatTime";
import Timer from "../../utils/timer";
// Styles
import { Time, Wrapper } from "./PlaybackTracker.styles";

interface PlaybackTrackerProps {
  duration: number;
  handleSeekTo: (seekValue: number) => void;
  isDisabled: boolean;
}

function PlaybackTracker({
  duration,
  handleSeekTo,
  isDisabled,
}: PlaybackTrackerProps) {
  const [internPosition, setInternPosition] = useState(Timer.time);

  useEffect(() => {
    const unsub = Timer.subscribe((time: number) => {
      setInternPosition(time);

      if (time > duration) {
        Timer.stop();
      }
    });

    return () => {
      unsub();
    };
  }, []);

  function handleTrackChange(newPart: number, clicked?: boolean) {
    setInternPosition(Math.round(duration * newPart));
    Timer.stop();

    if (clicked) {
      handleSeekTo(Math.round(duration * newPart));
    }
  }

  function handleEnd() {
    handleSeekTo(internPosition);
  }

  return (
    <Wrapper>
      <Time data-disabled={!isDisabled}>
        {formatTime(internPosition, true)}
      </Time>
      <Track
        currentPosition={(internPosition / duration) * 100}
        handleChange={handleTrackChange}
        handleEnd={handleEnd}
        isDisabled={isDisabled}
      />
      <Time data-disabled={!isDisabled}>{formatTime(duration, true)}</Time>
    </Wrapper>
  );
}

export default PlaybackTracker;
