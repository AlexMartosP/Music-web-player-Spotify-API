// Playlist - multiple
export function getPlaylistsByCategory(
  categoryId: string,
  country: string,
  limit?: string,
  offset?: string
) {
  const obj = {
    country,
    ...(limit && { limit }),
    ...(offset && { offset }),
  };

  const searchParams = new URLSearchParams(obj);

  return (
    `/browse/categories/${categoryId}/playlists
  ` + (searchParams.toString() && `?${searchParams}`)
  );
}

// Playlist - multiple
export function getFeaturedPlaylists(
  country: string,
  limit?: string,
  offset?: string
) {
  const obj = {
    country,
    ...(limit && { limit }),
    ...(offset && { offset }),
  };

  const searchParams = new URLSearchParams(obj);

  return (
    `/browse/featured-playlists` +
    (searchParams.toString() && `?${searchParams}`)
  );
}

// Playlist - single
export function getPlaylist(playlistId: string, market: string) {
  const obj = {
    market,
  };

  const searchParams = new URLSearchParams(obj);

  return (
    `/playlists/${playlistId}` + (searchParams.toString() && `?${searchParams}`)
  );
}
