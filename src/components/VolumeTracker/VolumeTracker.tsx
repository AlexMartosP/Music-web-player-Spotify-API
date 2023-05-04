import { usePlayer } from "../../context/Player/PlayerProvider";
import { selectVolume, update_volume } from "../../slices/playbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Track from "../ui/Track";
import { Wrapper } from "./VolumeTracker.styles";

interface VolumeTrackerProps {
  isDisabled: boolean;
}

function VolumeTracker({ isDisabled }: VolumeTrackerProps) {
  const volume = useAppSelector(selectVolume);
  const { playerActions } = usePlayer();

  return (
    <Wrapper>
      <Track
        currentPosition={volume * 100}
        handleChange={playerActions.setVolume}
        handleEnd={playerActions.setVolume}
        vertical
        isDisabled={isDisabled}
      />
    </Wrapper>
  );
}
export default VolumeTracker;
