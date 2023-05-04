import { base_api_url } from "../../config/api";
import { CacheType } from "../../types/cache";
import { GenrePlaylists } from "../../types/genre";
import {
  MultiplePlaylists,
  NextSinglePlaylistPageType,
} from "../../types/playlist";
import { getCurrentUserPlaylists } from "../URLCreators";

function getUserPlaylistsKey(limit?: string, offset?: string) {
  return (currentPageIndex: number, previousData: MultiplePlaylists) => {
    // If is first return base api
    if (!previousData)
      return { urls: base_api_url + getCurrentUserPlaylists(limit, offset) };

    // Return next page - track.next
    if (previousData.next) return { urls: previousData.next };

    return null;
  };
}

export default getUserPlaylistsKey;
