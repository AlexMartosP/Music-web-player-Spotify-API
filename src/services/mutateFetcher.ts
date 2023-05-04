import { AccesTokenStorage } from "../types/auth";

async function mutateFetcher(
  url: string,
  method: string,
  body?: object | Array<any>
) {
  const localAccessToken = localStorage.getItem("access_token");
  const access_token: AccesTokenStorage =
    localAccessToken && JSON.parse(localAccessToken);

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: "Bearer " + access_token.token,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  if (res.status !== 204 && res.headers.get("content-length") !== "0") {
    const data = await res.json();

    return data;
  }
}

export default mutateFetcher;
