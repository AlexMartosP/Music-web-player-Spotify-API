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
import { MultipleAlbums, SingleAlbumList } from "../../../../types/album";
import { Grid } from "../../../Genre/Genre.styles";
import NoResultsFound from "../../components/NoResultsFound/NoResultsFound";

function Albums() {
  const query: string = useOutletContext();

  const user = useAppSelector(selectCurrentUser);
  const { data, setSize } = useSWRInfinite<{
    albums: MultipleAlbums;
  }>(getSearchedKey(query, ["album"], user.country), fetcher, {
    revalidateAll: true,
    revalidateFirstPage: true,
    keepPreviousData: true,
  });

  const loadMoreRef = useInfiniteScroll(loadMore, [data]);

  function loadMore() {
    setSize((size) => size + 1);
  }

  let albums: SingleAlbumList[] = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      albums.push(...data[i].albums.items);
    }
  }

  return (
    <>
      {data ? (
        <>
          {albums.length > 0 ? (
            <>
              <Grid className="flow-sm">
                {albums.map((album) => (
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
              </Grid>
              <LoadMore ref={loadMoreRef} />
            </>
          ) : (
            <NoResultsFound type="albums" query={query} />
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

export default Albums;
