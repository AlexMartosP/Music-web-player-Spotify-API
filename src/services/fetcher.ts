import { BareFetcher, PublicConfiguration, Revalidator } from "swr/_internal";
import { AccesTokenStorage } from "../types/auth";
import { CacheType } from "../types/cache";
import { refreshToken } from "./auth";

export async function flatFetcher(args: CacheType) {
  const data: Array<any> = await fetcher(args);

  return data.flat();
}

export async function fetcher({ urls }: CacheType) {
  // if (typeof urls === "undefined") debugger;
  const localAccessToken = localStorage.getItem("access_token");
  const access_token: AccesTokenStorage =
    localAccessToken && JSON.parse(localAccessToken);

  if (access_token) {
    try {
      if (Array.isArray(urls)) {
        return await fetchMuliple(urls, access_token.token);
      } else {
        return await fetchSingle(urls, access_token.token);
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("invalid acces_token");
  }
}

async function fetchMuliple(urls: string[], access_token: string) {
  const promises = urls.map(async (url) => {
    const res = await fetch(url, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

    if (!res.ok) {
      const error = await res.json();

      throw error;
    }

    if (res.status !== 204) {
      const data = await res.json();

      return data;
    }
  });

  return Promise.all(promises);
}

async function fetchSingle(url: string, access_token: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  if (res.status !== 204) {
    const data = await res.json();

    return data;
  }
}

export async function onErrorRetry(
  error: any,
  key: string,
  config: Readonly<PublicConfiguration<any, any, BareFetcher<any>>>,
  revalidate: Revalidator,
  { retryCount }: { retryCount: number }
) {
  if (
    (error.error.message === "Invalid access token" || error.status === 401) &&
    retryCount < 2
  ) {
    const localRefreshToken = localStorage.getItem("refresh_token");
    if (localRefreshToken) {
      try {
        const tokenData = await refreshToken(localRefreshToken);

        localStorage.setItem(
          "access_token",
          JSON.stringify({
            token: tokenData.access_token,
            expires_at: tokenData.expires_in * 1000 + Date.now(),
          })
        );
        localStorage.setItem("refresh_token", tokenData.refresh_token);
        revalidate();
      } catch (error) {
        window.location.reload();
      }
    }
  }
  window.location.reload();

  return;
}
