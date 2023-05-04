import { ImagesType } from "./images";
import { PlaylistListType } from "./playlist";

export interface GenreInfo {
  href: string;
  icons: ImagesType[];
  id: string;
  name: string;
}

export interface GenrePlaylists {
  playlists: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: PlaylistListType[];
  };
}

export interface MultipleGenres {
  categories: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: GenreInfo[];
  };
}
