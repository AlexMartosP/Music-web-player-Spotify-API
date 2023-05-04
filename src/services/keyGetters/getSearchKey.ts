import { base_api_url } from "../../config/api";
import { MultipleTracks } from "../../types/track";
import { MediaTypes } from "../../types/types";
import { searchForItems } from "../URLCreators";

function getSearchedKey(q: string, type: MediaTypes[], market: string) {
  return (
    currentPageIndex: number,
    previousData: { [key: string]: MultipleTracks }
  ) => {
    const dot = `${type}s`;

    // If is first return base api
    if (!previousData)
      return { urls: base_api_url + searchForItems(q, type, market) };

    // Return next page - track.next
    if (previousData[dot].next) {
      return { urls: previousData[dot].next };
    }

    return null;
  };
}

export default getSearchedKey;
