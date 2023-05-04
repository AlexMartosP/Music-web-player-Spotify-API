export const base_api_url = "https://api.spotify.com/v1";
export const base_auth_url = "https://accounts.spotify.com";
export const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
export const scope = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-follow-modify",
  "user-follow-read",
  "user-top-read",
  "user-read-recently-played",
  "user-library-modify",
  "user-library-read",
  "user-read-private",
  "app-remote-control",
  "user-read-playback-position",
  "user-read-email",
].join(" ");
