import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useSWRInfinite from "swr/infinite";
import withNetwork from "../../HOC/withNetwork";
import saved from "../../assets/saved.jpg";
import IncludeSaving from "../../components/IncludeSaving";
import ListHero from "../../components/ListHero";
import SkeletonListHero from "../../components/ListHero/loading/SkeletonListHero";
import SingleTrack from "../../components/SingleTrack";
import Button from "../../components/ui/Button";
import Heading2 from "../../components/ui/Heading2";
import { SkeletonTrack } from "../../components/ui/Skeletons";
import formatDate from "../../helpers/formatDate";
import { fetcher } from "../../services/fetcher";
import getSavedTracksKey from "../../services/keyGetters/getSavedTrackesKey";
import { selectCurrentUser } from "../../slices/auth";
import { SinglePlaylistTrack } from "../../types/playlist";
import { SavedTracksType } from "../../types/user";
import MetaTitle from "../MetaTitle/MetaTitle";

function SavedTracks() {
  const user = useSelector(selectCurrentUser);

  const { data, setSize, isLoading, error } = useSWRInfinite<SavedTracksType>(
    getSavedTracksKey(user.country),
    fetcher,
    {
      revalidateAll: true,
      revalidateFirstPage: true,
      keepPreviousData: true,
    }
  );
  let tracks: SinglePlaylistTrack[] = [];
  if (data) {
    tracks.push(...data[0].items);

    for (let i = 1; i < data.length; i++) {
      tracks.push(...data[i].items);
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
          {data && tracks && !error && (
            <>
              <ListHero
                type="Playlist"
                name="Saved tracks"
                owners={user.display_name}
                images={[{ url: saved, height: "0", width: "0" }]}
                totalTracks={data[0].total}
                contextUri={`spotify:user:${user.id}:collection`}
                buttons={{ showPlay: true, showShuffle: true }}
              />
              <div className="flow">
                {tracks.length > 0 ? (
                  <IncludeSaving
                    ids={tracks.map((item) => item.track.id)}
                    setSize={setSize}
                  >
                    {tracks.map((item, index) => (
                      <SingleTrack
                        key={item.track.id}
                        trackData={item.track}
                        contextURI={`spotify:user:${user.id}:collection`}
                        index={index}
                        secondMeta={formatDate(item.added_at)}
                      />
                    ))}
                  </IncludeSaving>
                ) : (
                  <>
                    <Heading2>There are no saved tracks</Heading2>
                    <Button as={Link} to="/search" className="flow-xxs">
                      Add tracks
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
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
      <MetaTitle title="Saved tracks" />
    </>
  );
}

export default withNetwork(SavedTracks);
