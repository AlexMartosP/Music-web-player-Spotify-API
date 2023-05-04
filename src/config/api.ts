export const base_api_url = "https://api.spotify.com/v1";
export const base_auth_url = "https://accounts.spotify.com";
export const redirect_uri = "http://localhost:5173/login";
// export const redirect_uri = "http://localhost:4173/login";
// export const redirect_uri =
//   "https://5223-2a02-aa1-1012-2152-b498-6f6f-6ff0-4865.ngrok-free.app/login";
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
