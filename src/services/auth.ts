import { base_api_url, base_auth_url, redirect_uri } from "../config/api";

export async function getToken(
  code: string,
  code_verifier: string,
  signal?: AbortSignal
) {
  // code = from Spotify
  // code_verifier = created before
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: import.meta.env.VITE_CLIENT_ID,
    code_verifier: code_verifier,
    code: code,
    redirect_uri,
  });

  const res = await fetch(base_auth_url + "/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: body,
    signal: signal,
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return await res.json();
}

export async function refreshToken(
  refresh_token: string,
  signal?: AbortSignal
) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: import.meta.env.VITE_CLIENT_ID,
    refresh_token,
  });

  const res = await fetch(base_auth_url + "/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: body,
    signal,
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return await res.json();
}

export async function getCurrentUser(
  accessToken: string,
  signal?: AbortSignal
) {
  const res = await fetch(base_api_url + "/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    signal,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.json();
}
