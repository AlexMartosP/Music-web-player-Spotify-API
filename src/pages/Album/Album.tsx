import { useParams } from "react-router-dom";
// SWR
import useSWRInfinite from "swr/infinite";
// Redux
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../slices/auth";
// HOC
import withNetwork from "../../HOC/withNetwork";
// Components
import ListHero from "../../components/ListHero";
import SingleTrack from "../../components/SingleTrack";
import IncludeSaving from "../../components/IncludeSaving";
import SkeletonListHero from "../../components/ListHero/loading/SkeletonListHero";
import Heading2 from "../../components/ui/Heading2";
import { SkeletonTrack } from "../../components/ui/Skeletons";
// Services
import { fetcher } from "../../services/fetcher";
import getAlbumKey from "../../services/keyGetters/getAlbumKey";
// Helpers
import formatDate from "../../helpers/formatDate";
// Types
import { NextSingleAlbumPageType, SingleAlbum } from "../../types/album";
import { SingleTrackType } from "../../types/track";

function Album() {
  const { id } = useParams();
  const user = useAppSelector(selectCurrentUser);

  const { data, setSize, isLoading, error } = useSWRInfinite<
    SingleAlbum & NextSingleAlbumPageType
  >(getAlbumKey(id, user.country), fetcher, {
    revalidateAll: true,
    revalidateFirstPage: true,
    keepPreviousData: true,
  });

  let tracks: SingleTrackType[] = [];
  if (data) {
    tracks.push(...data[0].tracks.items);

    for (let i = 1; i < data.length; i++) {
      tracks.push(...data[i].items);
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
          {data && !error && (
            <>
              <ListHero
                type="Album"
                name={data[0].name}
                images={data[0].images}
                owners={data[0].artists.map((artist) => artist.name)}
                totalTracks={data[0].tracks.total}
                contextUri={`spotify:album:${data[0].id}`}
                buttons={{ showPlay: true, showShuffle: true }}
              />
              <div className="flow">
                {tracks.length > 0 ? (
                  <IncludeSaving
                    ids={tracks.map((track) => track.id)}
                    setSize={setSize}
                  >
                    {tracks.map((item, index) => (
                      <SingleTrack
                        key={item.id}
                        contextURI={`spotify:album:${data[0].id}`}
                        trackData={item}
                        index={index}
                        customImages={data[0].images}
                        albumData={data[0]}
                        secondMeta={formatDate(data[0].release_date)}
                      />
                    ))}
                  </IncludeSaving>
                ) : (
                  <>
                    <Heading2>This album has no tracks</Heading2>
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
    </>
  );
}

export default withNetwork(Album);
