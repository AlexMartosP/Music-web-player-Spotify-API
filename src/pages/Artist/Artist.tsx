import { Link, useParams } from "react-router-dom";
// SWR
import useSWR from "swr";
// Redux
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../slices/auth";
// Config
import { base_api_url } from "../../config/api";
// Services
import {
  getAlbumsByArtist,
  getArtist,
  getRelatedArtists,
  getTopTracksByArtist,
} from "../../services/URLCreators";
// HOC
import withNetwork from "../../HOC/withNetwork";
// Components
import Card from "../../components/ui/Card";
import Heading2 from "../../components/ui/Heading2";
import {
  SkeletonCard,
  SkeletonH1,
  SkeletonH2,
  SkeletonImage,
  SkeletonText,
  SkeletonTrack,
} from "../../components/ui/Skeletons";
import Slider from "../../components/ui/Slider";
import ExpandableTracks from "./components/ExpandableTracks/ExpandableTracks";
// Assets
import defaultImage from "../../assets/default_playlist.jpg";
// Styles
import { InfoWrapper, Section } from "./Artist.styles";
// Types
import {
  ArtistAlbums,
  ArtistTracks,
  RelatedArtists,
  SingleArtistType,
} from "../../types/artist";

function Artist() {
  const { id } = useParams();
  const user = useAppSelector(selectCurrentUser);

  const { data, isLoading } = useSWR<
    [SingleArtistType, ArtistAlbums, ArtistTracks, RelatedArtists, ArtistAlbums]
  >(
    id && {
      urls: [
        base_api_url + getArtist(id),
        base_api_url + getAlbumsByArtist(id, ["album"]),
        base_api_url + getTopTracksByArtist(id, user.country),
        base_api_url + getRelatedArtists(id),
        base_api_url + getAlbumsByArtist(id, ["appears_on"]),
      ],
    }
  );

  const [info, albums, tracksData, related, appearsOn] = data || [];
  let hasData = false;
  if (albums && tracksData && related && appearsOn) {
    if (
      albums.total > 0 ||
      related.artists.length > 0 ||
      appearsOn.total > 0 ||
      tracksData.tracks.length > 0
    ) {
      hasData = true;
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
          {info && albums && tracksData && appearsOn && related && (
            <>
              <InfoWrapper>
                <div className="image-wrapper">
                  <img
                    src={
                      info.images.length > 0 ? info.images[0].url : defaultImage
                    }
                    alt=""
                  />
                </div>
                <div>
                  <h1>{info.name}</h1>
                  <span>
                    {info.followers.total.toLocaleString()}
                    {info.followers.total > 1 ? " followers" : " follower"}
                  </span>
                </div>
              </InfoWrapper>
              {hasData ? (
                <>
                  {tracksData.tracks.length > 0 && (
                    <Section>
                      <div className="title-wrapper">
                        <h2>Top tracks</h2>
                      </div>
                      <ExpandableTracks tracksData={tracksData} />
                    </Section>
                  )}
                  {albums.total > 0 && (
                    <Section>
                      <div className="title-wrapper">
                        <h2>Albums</h2>
                        <Link to="albums">Show all</Link>
                      </div>
                      <Slider>
                        {albums.items.map((album) => (
                          <Card
                            key={album.id}
                            link={`/album/${album.id}`}
                            image={
                              album.images.length > 0
                                ? album.images[0].url
                                : defaultImage
                            }
                            title={album.name}
                          />
                        ))}
                      </Slider>
                    </Section>
                  )}
                  {appearsOn.total > 0 && (
                    <Section>
                      <div className="title-wrapper">
                        <h2>Appears on</h2>
                        <Link to="featuring">Show all</Link>
                      </div>
                      <Slider>
                        {appearsOn.items.map((album) => (
                          <Card
                            key={album.id}
                            link={`/album/${album.id}`}
                            image={
                              album.images.length > 0
                                ? album.images[0].url
                                : defaultImage
                            }
                            title={album.name}
                          />
                        ))}
                      </Slider>
                    </Section>
                  )}
                  {related.artists.length > 0 && (
                    <Section>
                      <div className="title-wrapper">
                        <h2>Similar artists</h2>
                        <Link to="related">Show all</Link>
                      </div>
                      <Slider>
                        {related.artists.map((artist) => (
                          <Card
                            key={artist.id}
                            link={`/artist/${artist.id}`}
                            image={
                              artist.images.length > 0
                                ? artist.images[0].url
                                : defaultImage
                            }
                            title={artist.name}
                          />
                        ))}
                      </Slider>
                    </Section>
                  )}
                </>
              ) : (
                <div className="flow">
                  <Heading2>This artist has no data</Heading2>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <InfoWrapper>
            <SkeletonImage className="image-wrapper" />
            <div className="flex-1 flow-xxs">
              <SkeletonH1 />
              <SkeletonText />
            </div>
          </InfoWrapper>
          <Section>
            <SkeletonH2 />
            {new Array(5).fill("").map((t, i) => (
              <SkeletonTrack key={i} />
            ))}
          </Section>
          {new Array(3).fill("").map((t, i) => (
            <Section key={i}>
              <SkeletonH2 />
              <Slider>
                {new Array(12).fill("").map((t, i) => (
                  <SkeletonCard key={i} />
                ))}
              </Slider>
            </Section>
          ))}
        </>
      )}
    </>
  );
}

export default withNetwork(Artist);
