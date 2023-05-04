import { base_api_url } from "../../config/api";
import {
  NextSinglePlaylistPageType,
  SinglePlaylistType,
} from "../../types/playlist";
import { getPlaylist } from "../URLCreators";

function getPlaylistKey(id: string | undefined, market: string) {
  if (!id) {
    throw new Error("ID not passed");
  }
  return (
    currentPageIndex: number,
    previousData: SinglePlaylistType | NextSinglePlaylistPageType
  ) => {
    // If is first return base api
    if (!previousData)
      return {
        type: "list",
        key: id,
        urls: base_api_url + getPlaylist(id, market),
      };
    // If seconds - go depper in object
    if (
      currentPageIndex === 1 &&
      (previousData as SinglePlaylistType).tracks.next
    )
      return {
        type: "list",
        key: id,
        urls: (previousData as SinglePlaylistType).tracks.next,
      };

    // Return next page - track.next
    if ((previousData as NextSinglePlaylistPageType).next)
      return {
        type: "list",
        key: id,
        urls: (previousData as NextSinglePlaylistPageType).next,
      };

    return null;
  };
}

export default getPlaylistKey;
