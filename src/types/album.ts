import { ArtistType } from "./artist";
import { ImagesType } from "./images";
import { SingleTrackType } from "./track";

export type Groups = string | string | string | string;

export interface SingleAlbumList {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImagesType[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  copyrights: [
    {
      text: string;
      type: string;
    }
  ];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: ArtistType[];
}

export interface SingleAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImagesType[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  copyrights: [
    {
      text: string;
      type: string;
    }
  ];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: ArtistType[];
  tracks: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SingleTrackType[];
  };
}

export interface SingleAlbumTrack {
  artists: ArtistType[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
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
  restrictions: {
    reason: string;
  };
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface NextSingleAlbumPageType {
  href: string;
  items: SingleTrackType[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string;
  total: number;
}

export interface MultipleAlbums {
  href: string;
  items: SingleAlbumList[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string;
  total: number;
}
