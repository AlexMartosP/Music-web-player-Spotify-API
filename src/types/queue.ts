import { SingleTrackType } from "./track";

export interface QueueType {
  currently_playing: SingleTrackType;
  queue: SingleTrackType[];
}
