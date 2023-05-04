import { Groups } from "../../types/album";

// Artist - single
export function getArtist(artistId: string) {
  return `/artists/${artistId}`;
}

export function getTopTracksByArtist(artistId: string, market: string) {
  const obj = {
    market,
  };

  const searchParams = new URLSearchParams(obj);

  return (
    `/artists/${artistId}/top-tracks` +
    (searchParams.toString() && `?${searchParams}`)
  );
}

export function getAlbumsByArtist(
  artistId: string,
  include_groups?: Groups[],
  limit?: string,
  offset?: string
) {
  const obj = {
    ...(include_groups && { include_groups: include_groups.join(",") }),
    ...(limit && { limit }),
    ...(offset && { offset }),
  };

  const searchParams = new URLSearchParams(obj);

  return (
    `/artists/${artistId}/albums` +
    (searchParams.toString() && `?${searchParams}`)
  );
}

export function getRelatedArtists(artistId: string) {
  return `/artists/${artistId}/related-artists`;
}
