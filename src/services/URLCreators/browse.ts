import { MediaTypes } from "../../types/types";

export function searchForItems(
  q: string,
  type: MediaTypes[],
  market: string,
  limit?: string,
  offset?: string
) {
  const obj = {
    q,
    type: type.join(","),
    market,
    ...(limit && { limit }),
    ...(offset && { offset }),
  };

  const searchParams = new URLSearchParams(obj);

  return `/search` + (searchParams.toString() && `?${searchParams}`);
}
