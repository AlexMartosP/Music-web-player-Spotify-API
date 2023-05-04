import { base_api_url } from "../../config/api";
import { SingleAlbum } from "../../types/album";
import {
  NextSinglePlaylistPageType,
  SinglePlaylistType,
} from "../../types/playlist";
import { getAlbum, getPlaylist } from "../URLCreators";

function getAlbumKey(id: string | undefined, market: string) {
  if (!id) {
    throw new Error("ID not passed");
  }
  return (
    currentPageIndex: number,
    previousData: SingleAlbum | NextSinglePlaylistPageType
  ) => {
    // If is first return base api
    if (!previousData) return { urls: base_api_url + getAlbum(id, market) };
    // If seconds - go depper in object
    if (currentPageIndex === 1 && (previousData as SingleAlbum).tracks.next)
      return { urls: (previousData as SingleAlbum).tracks.next };

    // Return next page - track.next
    if ((previousData as NextSinglePlaylistPageType).next)
      return { urls: (previousData as NextSinglePlaylistPageType).next };

    return null;
  };
}

export default getAlbumKey;
