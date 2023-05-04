import { Volume1, Volume2, VolumeX, X } from "react-feather";
import useDevices from "../../../../../../hooks/useDevices";
import {
  Content,
  LoadingWrapper,
  NoDevices,
  VolumeWrapper,
  Wrapper,
} from "./Devices.styles";
import {
  CurrentWrapper,
  Item,
} from "../../../DevicesModal/DevicesModal.styles";
import { selectPlaybar } from "../../../../../../slices/playbar";
import { useAppSelector } from "../../../../../../store/hooks";
import { LoadingAnimation } from "../../../../../ui/LoadingAnimation";
import { usePlayer } from "../../../../../../context/Player/PlayerProvider";
import Track from "../../../../../ui/Track";

interface DevicesProps {
  closeDevices: () => void;
}

function Devices({ closeDevices }: DevicesProps) {
  const { activeDevice, inActiveDevices, isLoading, transferDevice } =
    useDevices();
  const playbar = useAppSelector(selectPlaybar);
  const { localVolume, handleVolumeChange } = usePlayer();

  function handleClick(id: string) {
    transferDevice(id);
    closeDevices();
  }

  return (
    <Wrapper
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <button onClick={closeDevices} className="reset-button">
        <X />
      </button>
      {!isLoading ? (
        <>
          <Content>
            {activeDevice && (
              <CurrentWrapper>
                <p>Currently playing</p>
                <span>{activeDevice.name}</span>
              </CurrentWrapper>
            )}
            {(!activeDevice || activeDevice.id !== playbar.deviceId) && (
              <Item
                className="reset-button"
                onClick={() => handleClick(playbar.deviceId)}
              >
                <span>This web player</span>
              </Item>
            )}
            {inActiveDevices.length > 0 ? (
              <>
                {inActiveDevices.map(
                  (device) =>
                    device.id !== activeDevice?.id &&
                    device.id !== playbar.deviceId && (
                      <Item
                        className="reset-button"
                        key={device.id}
                        onClick={() => handleClick(device.id)}
                      >
                        <span>{device.name}</span>
                      </Item>
                    )
                )}
              </>
            ) : (
              <NoDevices className="flow-sm">No other devices</NoDevices>
            )}
          </Content>
          <VolumeWrapper>
            <Track
              currentPosition={localVolume * 100}
              handleChange={handleVolumeChange}
              handleEnd={handleVolumeChange}
              isDisabled={!playbar.isActive}
            />
            {localVolume < 0.1 && <VolumeX />}
            {localVolume <= 0.5 && localVolume > 0.1 && <Volume1 />}
            {localVolume > 0.5 && <Volume2 />}
          </VolumeWrapper>
        </>
      ) : (
        <LoadingWrapper className="flow-sm">
          <LoadingAnimation />
        </LoadingWrapper>
      )}
    </Wrapper>
  );
}

export default Devices;
