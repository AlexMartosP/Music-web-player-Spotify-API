import { Link, Outlet, useOutlet } from "react-router-dom";
// SWR
import useSWR from "swr";
// Config
import { base_api_url } from "../../../../config/api";
// Redux
import { selectCurrentUser } from "../../../../slices/auth";
// Hooks
import { useAppSelector } from "../../../../store/hooks";
// Services
import { searchForItems } from "../../../../services/URLCreators";
import { fetcher } from "../../../../services/fetcher";
// Components
import Filter from "../Filter";
import NoResultsFound from "../NoResultsFound";
import ResultsLoading from "./ResultsLoading";
import Heading2 from "../../../../components/ui/Heading2";
import Section from "../../../../components/ui/Section";
import IncludeSaving from "../../../../components/IncludeSaving";
import SingleTrack from "../../../../components/SingleTrack";
import Card from "../../../../components/ui/Card";
import Slider from "../../../../components/ui/Slider";
// Assets
import defaultImage from "../../../../assets/default_playlist.jpg";
// Types
import { SingleAlbum } from "../../../../types/album";
import { SingleArtistType } from "../../../../types/artist";
import { SinglePlaylistType } from "../../../../types/playlist";
import { SingleTrackType } from "../../../../types/track";

interface SearchResultProps {
  query: string;
}

const SearchResult = ({ query }: SearchResultProps) => {
  const user = useAppSelector(selectCurrentUser);
  const outlet = useOutlet();
  const { data } = useSWR(
    query && {
      urls:
        base_api_url +
        searchForItems(
          query,
          ["album", "artist", "track", "playlist"],
          user.country,
          "8"
        ),
    },
    fetcher,
    { keepPreviousData: true }
  );

  let hasData = false;
  if (data) {
    hasData =
      data.tracks.total +
        data.playlists.total +
        data.albums.total +
        data.artists.total >
      0;
  }

  return (
    <>
      {data ? (
        <>
          {(hasData || outlet) && <Filter data={data} query={query} />}
          {outlet ? (
            <Outlet context={query} />
          ) : (
            <>
              {hasData ? (
                <>
                  {data.tracks.total > 0 && (
                    <Section>
                      <div className="title-wrapper">
                        <Heading2>Tracks</Heading2>
                        <Link to={{ pathname: "tracks", search: `q=${query}` }}>
                          View all
                        </Link>
                      </div>
                      <div className="flow-xs">
                        <IncludeSaving
                          ids={data.tracks.items.map(
                            (track: SingleTrackType) => track.id
                          )}
                        >
                          {data.tracks.items
                            .slice(0, 5)
                            .map((track: SingleTrackType, index: number) => (
                              <SingleTrack
                                key={track.id}
                                index={index}
                                trackData={track}
                                secondMeta={
                                  track.album ? track.album.release_date : ""
                                }
                              />
                            ))}
                        </IncludeSaving>
                      </div>
                    </Section>
                  )}
                  {data.playlists.total > 0 && (
                    <Section>
                      <div className="title-wrapper">
                        <Heading2>Playlists</Heading2>
                        <Link
                          to={{ pathname: "playlists", search: `q=${query}` }}
                        >
                          View all
                        </Link>
                      </div>
                      <div className="flow-xs">
                        <Slider>
                          {data.playlists.items.map(
                            (playlist: SinglePlaylistType, index: number) => (
                              <Card
                                key={playlist.id}
                                image={
                                  playlist.images.length > 0
                                    ? playlist.images[0].url
                                    : defaultImage
                                }
                                title={playlist.name}
                                link={`/playlist/${playlist.id}`}
                              />
                            )
                          )}
                        </Slider>
                      </div>
                    </Section>
                  )}
                  {data.albums.total > 0 && (
                    <Section>
                      <div className="title-wrapper">
                        <Heading2>Albums</Heading2>
                        <Link to={{ pathname: "albums", search: `q=${query}` }}>
                          View all
                        </Link>
                      </div>
                      <div className="flow-xs">
                        <Slider>
                          {data.albums.items.map((album: SingleAlbum) => (
                            <Card
                              key={album.id}
                              image={
                                album.images.length > 0
                                  ? album.images[0].url
                                  : defaultImage
                              }
                              title={album.name}
                              link={`/album/${album.id}`}
                            />
                          ))}
                        </Slider>
                      </div>
                    </Section>
                  )}
                  {data.artists.total > 0 && (
                    <Section>
                      <div className="title-wrapper">
                        <Heading2>Artists</Heading2>
                        <Link
                          to={{ pathname: "artists", search: `q=${query}` }}
                        >
                          View all
                        </Link>
                      </div>
                      <div className="flow-xs">
                        <Slider>
                          {data.artists.items.map(
                            (artist: SingleArtistType) => (
                              <Card
                                key={artist.id}
                                image={
                                  artist.images.length > 0
                                    ? artist.images[0].url
                                    : defaultImage
                                }
                                title={artist.name}
                                link={`/artist/${artist.id}`}
                              />
                            )
                          )}
                        </Slider>
                      </div>
                    </Section>
                  )}
                </>
              ) : (
                <NoResultsFound type="results" query={query} showBtn={false} />
              )}
            </>
          )}
        </>
      ) : (
        <ResultsLoading />
      )}
    </>
  );
};

export default SearchResult;
