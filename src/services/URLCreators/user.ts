export function getCurrentUserPlaylists(limit?: string, offset?: string) {
  const obj = {
    ...(limit && { limit }),
    ...(offset && { offset }),
  };

  const searchParams = new URLSearchParams(obj);

  return `/me/playlists` + (searchParams.toString() && `?${searchParams}`);
}

export function getTopItems(
  type: "tracks" | "artists",
  limit?: string,
  offset?: string
) {
  const obj = {
    ...(limit && { limit }),
    ...(offset && { offset }),
  };

  const searchParams = new URLSearchParams(obj);

  return `/me/top/${type}` + (searchParams.toString() && `?${searchParams}`);
}
