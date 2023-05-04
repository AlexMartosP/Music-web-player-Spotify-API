export function getBrowseGenres(
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

  return `/browse/categories` + (searchParams.toString() && `?${searchParams}`);
}

export function getGenreInfo(categoryId: string) {
  return `/browse/categories/${categoryId}`;
}

export function getGenrePlaylists(
  categoryId: string,
  country?: string,
  limit?: string,
  offset?: string
) {
  const obj = {
    ...(country && { country }),
    ...(limit && { limit }),
    ...(offset && { offset }),
  };

  const searchParams = new URLSearchParams(obj);

  return (
    `/browse/categories/${categoryId}/playlists` +
    (searchParams.toString() && `?${searchParams}`)
  );
}
