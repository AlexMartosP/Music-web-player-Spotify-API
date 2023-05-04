import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useSWRInfinite from "swr/infinite";
import withNetwork from "../../HOC/withNetwork";
import IncludeSaving from "../../components/IncludeSaving";
import ListHero from "../../components/ListHero";
import SkeletonListHero from "../../components/ListHero/loading/SkeletonListHero";
import SingleTrack from "../../components/SingleTrack";
import Button from "../../components/ui/Button";
import Heading2 from "../../components/ui/Heading2";
import { SkeletonTrack } from "../../components/ui/Skeletons";
import formatDate from "../../helpers/formatDate";
import { fetcher } from "../../services/fetcher";
import getPlaylistKey from "../../services/keyGetters/getPlaylistKey";
import { selectCurrentUser } from "../../slices/auth";
import {
  NextSinglePlaylistPageType,
  SinglePlaylistTrack,
  SinglePlaylistType,
} from "../../types/playlist";
import NotFound from "../NotFound";
import MetaTitle from "../MetaTitle/MetaTitle";

function Playlist() {
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);
  const { data, setSize, isLoading, error } = useSWRInfinite<
    SinglePlaylistType & NextSinglePlaylistPageType
  >(getPlaylistKey(id, user.country), fetcher, {
    revalidateAll: true,
    revalidateFirstPage: true,
    keepPreviousData: true,
  });

  let tracks: SinglePlaylistTrack[] = [];
  if (data) {
    tracks.push(...data[0].tracks.items);

    for (let i = 1; i < data.length; i++) {
      tracks.push(...data[i].items);
    }
  }

  if (error && error?.error?.status === 404)
    return <NotFound text="The playlist was not found" />;

  return (
    <>
      {!isLoading ? (
        <>
          {data && (
            <>
              <ListHero
                type="Playlist"
                name={data[0].name}
                images={data[0].images}
                description={data[0].description}
                owners={data[0].owner.display_name}
                totalTracks={data[0].tracks.total}
                contextUri={`spotify:playlist:${data[0].id}`}
                buttons={{ showPlay: true, showShuffle: true }}
              />
              <div className="flow">
                {tracks.length > 0 ? (
                  <>
                    <IncludeSaving
                      ids={tracks.map((item) => item.track && item.track.id)}
                      setSize={setSize}
                    >
                      {tracks.map((item, index) => (
                        <SingleTrack
                          key={item.track?.id + index}
                          trackData={item.track}
                          contextURI={`spotify:playlist:${data[0].id}`}
                          index={index}
                          secondMeta={formatDate(item.added_at)}
                          playlist={{
                            own: user.id === data[0].owner.id,
                            id: data[0].id,
                          }}
                        />
                      ))}
                    </IncludeSaving>
                  </>
                ) : (
                  <>
                    <Heading2>This playlist don't have any tracks</Heading2>
                    <Button as={Link} to="/search" className="flow-xxs">
                      Add tracks
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
          <MetaTitle title={data ? `Playlist - ${data[0].name}` : "Playlist"} />
        </>
      ) : (
        <>
          <SkeletonListHero />
          <div className="flow">
            {new Array(12).fill("").map((t, i) => (
              <SkeletonTrack key={i} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default withNetwork(Playlist);
