import { base_api_url } from "../../config/api";
import { SavedTracksType } from "../../types/user";
import { getUsersSavedTracks } from "../URLCreators";

function getSavedTracksKey(market: string) {
  return (currentPageIndex: number, previousData: SavedTracksType) => {
    // If is first return base api
    if (!previousData)
      return { urls: base_api_url + getUsersSavedTracks(market) };

    // Return next page - track.next
    if (previousData.next) {
      const url = new URL(previousData.next);
      url.searchParams.append("market", market);
      return { urls: url.toString() };
    }

    return null;
  };
}

export default getSavedTracksKey;
