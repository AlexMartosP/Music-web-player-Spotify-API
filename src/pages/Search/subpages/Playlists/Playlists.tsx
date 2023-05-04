import { useOutletContext } from "react-router-dom";
import useSWRInfinite from "swr/infinite";
import defaultImage from "../../../../assets/default_playlist.jpg";
import Card from "../../../../components/ui/Card";
import { SkeletonCard } from "../../../../components/ui/Skeletons";
import useInfiniteScroll, {
  LoadMore,
} from "../../../../hooks/useInfiniteScroll";
import { fetcher } from "../../../../services/fetcher";
import getSearchedKey from "../../../../services/keyGetters/getSearchKey";
import { selectCurrentUser } from "../../../../slices/auth";
import { useAppSelector } from "../../../../store/hooks";
import {
  MultiplePlaylists,
  SinglePlaylistType,
} from "../../../../types/playlist";
import { Grid } from "../../../Genre/Genre.styles";
import NoResultsFound from "../../components/NoResultsFound/NoResultsFound";

function Playlists() {
  const query: string = useOutletContext();

  const user = useAppSelector(selectCurrentUser);
  const { data, setSize } = useSWRInfinite<{
    playlists: MultiplePlaylists;
  }>(getSearchedKey(query, ["playlist"], user.country), fetcher, {
    revalidateAll: true,
    revalidateFirstPage: true,
    keepPreviousData: true,
  });

  const loadMoreRef = useInfiniteScroll(loadMore, [data]);

  function loadMore() {
    setSize((size) => size + 1);
  }

  let playlists: SinglePlaylistType[] = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      playlists.push(...data[i].playlists.items);
    }
  }

  return (
    <>
      {data ? (
        <>
          {playlists.length > 0 ? (
            <>
              <Grid className="flow-sm">
                {playlists.map((playlist) => (
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
                ))}
              </Grid>
              <LoadMore ref={loadMoreRef} />
            </>
          ) : (
            <NoResultsFound type="playlists" query={query} />
          )}
        </>
      ) : (
        <Grid>
          {new Array(12).fill("").map((t, i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>
      )}
    </>
  );
}

export default Playlists;
