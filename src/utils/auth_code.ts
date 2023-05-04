// Config
import { base_auth_url, redirect_uri, scope } from "../config/api";

// Generate a random string
export function generateRandomString(length: number): string {
  let generatedString = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789._-";

  for (let i = 0; i < length; i++) {
    generatedString += possible[Math.floor(Math.random() * possible.length)];
  }

  return generatedString;
}

export async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(str: ArrayBuffer) {
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(str)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export function generateAuthUrl(code: string): { url: string; state: string } {
  const state = generateRandomString(16);
  const queries = {
    client_id: import.meta.env.VITE_CLIENT_ID,
    response_type: "code",
    redirect_uri,
    state,
    scope,
    code_challenge_method: "S256",
    code_challenge: code,
  };

  const searchParams = new URLSearchParams(queries);

  return {
    url: base_auth_url + "/authorize?" + searchParams,
    state,
  };
}
