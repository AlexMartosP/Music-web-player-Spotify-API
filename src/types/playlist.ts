import { ImagesType } from "./images";
import { SingleTrackType } from "./track";

export interface PlaylistListType {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImagesType[];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

export interface SinglePlaylistType {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  href: string;
  id: string;
  images: ImagesType[];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SinglePlaylistTrack[];
  };
  type: string;
  uri: string;
  primary_color: null;
}

export interface SinglePlaylistTrack {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  track: SingleTrackType;
}

export interface NextSinglePlaylistPageType {
  href: string;
  items: SinglePlaylistTrack[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string;
  total: number;
}

export interface MultiplePlaylists {
  href: string;
  items: SinglePlaylistType[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string;
  total: number;
}
