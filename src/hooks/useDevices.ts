// SWR
import useSWR from "swr";
// Redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectPlaybar, transfer } from "../slices/playbar";
import { selectRemote } from "../slices/remote";
// Config
import { base_api_url } from "../config/api";
// Context
import { useRemoteHandlers } from "../context/RemoteHandlers";
// Types
import { AvailableDevices, SingleDevice } from "../types/devices";

function useDevices() {
  const { data, isLoading, error } = useSWR<AvailableDevices>({
    urls: base_api_url + "/me/player/devices",
  });
  const dispatch = useAppDispatch();
  const playbar = useAppSelector(selectPlaybar);
  const remote = useAppSelector(selectRemote);
  const { leaveAsModerator } = useRemoteHandlers();

  function transferDevice(deviceId: string) {
    dispatch(transfer(deviceId));

    if (remote.isModerator && deviceId !== playbar.deviceId) {
      leaveAsModerator();
    }
  }

  let activeDevice!: SingleDevice;
  let inActiveDevices: SingleDevice[] = [];
  if (data) {
    activeDevice = data.devices.find((device) => device.is_active)!;
    if (activeDevice) {
      inActiveDevices = data.devices.filter(
        (device) => device.id !== activeDevice.id
      );
    } else {
      inActiveDevices = data.devices;
    }
  }

  return {
    activeDevice,
    inActiveDevices,
    isLoading,
    error,
    transferDevice,
  };
}

export default useDevices;
