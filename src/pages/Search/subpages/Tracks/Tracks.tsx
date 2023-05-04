import { useOutletContext } from "react-router-dom";
// SWR
import useSWRInfinite from "swr/infinite";
// Redux
import { selectCurrentUser } from "../../../../slices/auth";
import { useAppSelector } from "../../../../store/hooks";
// Components
import IncludeSaving from "../../../../components/IncludeSaving";
import SingleTrack from "../../../../components/SingleTrack";
import SkeletonTrack from "../../../../components/ui/Skeletons/SkeletonTrack";
import NoResultsFound from "../../components/NoResultsFound/NoResultsFound";
// Services
import { fetcher } from "../../../../services/fetcher";
import getSearchedKey from "../../../../services/keyGetters/getSearchKey";
// Types
import { MultipleTracks, SingleTrackType } from "../../../../types/track";

function Tracks() {
  const query: string = useOutletContext();

  const user = useAppSelector(selectCurrentUser);
  const { data, setSize } = useSWRInfinite<{
    tracks: MultipleTracks;
  }>(getSearchedKey(query, ["track"], user.country), fetcher, {
    revalidateAll: true,
    revalidateFirstPage: true,
    keepPreviousData: true,
  });

  let tracks: SingleTrackType[] = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      tracks.push(...data[i].tracks.items);
    }
  }

  return (
    <>
      {data ? (
        <>
          {tracks.length > 0 ? (
            <div className="flow-sm">
              <IncludeSaving
                ids={tracks.map((track) => track.id)}
                setSize={setSize}
              >
                {tracks.map((track, index: number) => (
                  <SingleTrack
                    key={track.id}
                    index={index}
                    trackData={track}
                    secondMeta={track.album ? track.album.release_date : ""}
                  />
                ))}
              </IncludeSaving>
            </div>
          ) : (
            <NoResultsFound type="tracks" query={query} />
          )}
        </>
      ) : (
        <div className="flow-sm">
          {new Array(12).fill("").map((t, i) => (
            <SkeletonTrack key={i} />
          ))}
        </div>
      )}
    </>
  );
}

export default Tracks;
