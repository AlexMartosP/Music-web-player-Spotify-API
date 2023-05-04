import Track from "../ui/Track";
import { Wrapper } from "./VolumeTracker.styles";

interface VolumeTrackerProps {
  currentVolume: number;
  isDisabled: boolean;
  handleVolumeChange: (newVolume: number) => void;
}

function VolumeTracker({
  currentVolume,
  isDisabled,
  handleVolumeChange,
}: VolumeTrackerProps) {
  return (
    <Wrapper>
      <Track
        currentPosition={currentVolume * 100}
        handleChange={handleVolumeChange}
        handleEnd={handleVolumeChange}
        vertical
        isDisabled={isDisabled}
      />
    </Wrapper>
  );
}
export default VolumeTracker;
