import { base_api_url } from "../../config/api";

export function getUsersSavedTracks(
  market: string,
  limit?: string,
  offset?: string
) {
  const obj = {
    market,
    ...(limit && { limit }),
    ...(offset && { offset }),
  };

  const searchParams = new URLSearchParams(obj);

  return `/me/tracks` + (searchParams.toString() && `?${searchParams}`);
}

export function checkSavedTracks(ids: string[]): string[] {
  let arr = [...ids];
  let groups = [];
  let urls: string[] = [];

  while (arr.length > 0) {
    groups.push(arr.slice(0, 50));

    arr = arr.slice(50);
  }

  groups.forEach((group) => {
    urls.push(base_api_url + `/me/tracks/contains?ids=${group.join(",")}`);
  });

  return urls;
}
