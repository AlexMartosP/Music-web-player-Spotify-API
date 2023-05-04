import { base_api_url } from "../../../config/api";
import { fetcher } from "../../../services/fetcher";
import mutateFetcher from "../../../services/mutateFetcher";
import {
  selectPlaybar,
  update_device,
  update_status,
} from "../../../slices/playbar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

function useDeviceActions() {
  const dispatch = useAppDispatch();
  const playbar = useAppSelector(selectPlaybar);

  const load = async (deviceId: string) => {
    dispatch(update_device(deviceId));

    const availableDevices = await fetcher({
      urls: base_api_url + "/me/player/devices",
    });

    if (
      availableDevices.devices.length === 1 &&
      availableDevices.devices[0].id === deviceId
    ) {
      transfer(deviceId);
    }
  };

  const transfer = async (deviceId: string) => {
    await mutateFetcher(base_api_url + `/me/player`, "PUT", {
      device_ids: [deviceId],
    });

    if (deviceId === playbar.deviceId) {
      dispatch(update_status(true));
    }

    return;
  };

  return { load, transfer };
}

export default useDeviceActions;
