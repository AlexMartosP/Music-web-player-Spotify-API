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
import { MultipleArtists, SingleArtistType } from "../../../../types/artist";
import { Grid } from "../../../Genre/Genre.styles";
import NoResultsFound from "../../components/NoResultsFound/NoResultsFound";

function Artists() {
  const query: string = useOutletContext();

  const user = useAppSelector(selectCurrentUser);
  const { data, setSize } = useSWRInfinite<{
    artists: MultipleArtists;
  }>(getSearchedKey(query, ["artist"], user.country), fetcher, {
    revalidateAll: true,
    revalidateFirstPage: true,
    keepPreviousData: true,
  });

  const loadMoreRef = useInfiniteScroll(loadMore, [data]);

  function loadMore() {
    setSize((size) => size + 1);
  }

  let artists: SingleArtistType[] = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      artists.push(...data[i].artists.items);
    }
  }

  return (
    <>
      {data ? (
        <>
          {artists.length > 0 ? (
            <>
              <Grid className="flow-sm">
                {artists.map((artist) => (
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
                ))}
              </Grid>
              <LoadMore ref={loadMoreRef} />
            </>
          ) : (
            <NoResultsFound type="artists" query={query} />
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

export default Artists;
