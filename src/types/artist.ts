import { SingleAlbumList } from "./album";
import { ImagesType } from "./images";
import { SingleTrackType } from "./track";

export interface SingleArtistType {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ImagesType[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ArtistType {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ArtistAlbums {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SingleAlbumList[];
}

export interface MultipleArtists {
  href: string;
  items: SingleArtistType[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string;
  total: number;
}

export interface ArtistTracks {
  tracks: SingleTrackType[];
}

export interface RelatedArtists {
  artists: SingleArtistType[];
}
