import { SingleAlbum } from "./album";
import { ArtistType } from "./artist";

export interface SingleTrackType {
  album?: SingleAlbum;
  artists: ArtistType[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: false;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
  is_playable: boolean;
  linked_from: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
}

export interface MultipleTracks {
  href: string;
  items: SingleTrackType[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string;
  total: number;
}
