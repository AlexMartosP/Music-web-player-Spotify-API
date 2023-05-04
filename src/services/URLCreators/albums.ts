export function getAlbum(albumId: string, market?: string) {
  const obj = {
    ...(market && { market }),
  };

  const searchParams = new URLSearchParams(obj);

  return `/albums/${albumId}` + (searchParams.toString() && `?${searchParams}`);
}
