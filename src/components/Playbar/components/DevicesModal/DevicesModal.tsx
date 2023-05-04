import { LoadingAnimation } from "../../../ui/LoadingAnimation";
import useDevices from "../../../../hooks/useDevices";
import { selectPlaybar } from "../../../../slices/playbar";
import { useAppSelector } from "../../../../store/hooks";
import { CurrentWrapper, Item, Wrapper } from "./DevicesModal.styles";

function DevicesModal() {
  const { activeDevice, inActiveDevices, isLoading, transferDevice } =
    useDevices();
  const playbar = useAppSelector(selectPlaybar);

  return (
    <Wrapper>
      {!isLoading ? (
        <div>
          {activeDevice && (
            <CurrentWrapper>
              <p>Currently playing</p>
              <span>{activeDevice.name}</span>
            </CurrentWrapper>
          )}

          {(!activeDevice || activeDevice.id !== playbar.deviceId) && (
            <Item
              className="reset-button"
              onClick={() => transferDevice(playbar.deviceId)}
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
                      onClick={() => transferDevice(device.id)}
                    >
                      <span>{device.name}</span>
                    </Item>
                  )
              )}
            </>
          ) : (
            <span className="pad">No other devices</span>
          )}
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </Wrapper>
  );
}

export default DevicesModal;
