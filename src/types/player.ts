import { ImagesType } from "./images";

export interface RecetlyPlayedType {
  href: string;
  limit: number;
  next: string;
  cursors: {
    after: string;
    before: string;
  };
  items: [
    {
      track: {
        album: {
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
          type: string;
          uri: string;
          album_group: string;
          artists: [
            {
              external_urls: {
                spotify: string;
              };
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
            }
          ];
        };
        artists: [
          {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }
        ];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
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
      };
      played_at: string;
      context: {
        type: string;
        href: string;
        external_urls: {
          spotify: string;
        };
        uri: string;
      };
    }
  ];
}
