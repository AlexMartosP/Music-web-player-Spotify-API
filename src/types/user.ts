import { SinglePlaylistTrack } from "./playlist";
import { SingleTrackType } from "./track";

export interface SavedTracksType {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SinglePlaylistTrack[];
}
