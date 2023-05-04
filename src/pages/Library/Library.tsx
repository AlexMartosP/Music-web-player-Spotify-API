// SWR
import useSWRInfinite from "swr/infinite";
// Redux
import { useAppDispatch } from "../../store/hooks";
import { showModal } from "../../slices/modal";
// Hooks
import useInfiniteScroll, { LoadMore } from "../../hooks/useInfiniteScroll";
// Services
import getUserPlaylistsKey from "../../services/keyGetters/getMultiplePlaylistsKey";
// HOC
import withNetwork from "../../HOC/withNetwork";
// Component
import { SkeletonCard } from "../../components/ui/Skeletons";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import Heading2 from "../../components/ui/Heading2";
// Assets
import defaultImage from "../../assets/default_playlist.jpg";
// Styled
import { Grid } from "../Genre/Genre.styles";
// Types
import { MultiplePlaylists, SinglePlaylistType } from "../../types/playlist";
import { Helmet } from "react-helmet-async";
import MetaTitle from "../MetaTitle/MetaTitle";

function Library() {
  const { data, isLoading, error, setSize } = useSWRInfinite<MultiplePlaylists>(
    getUserPlaylistsKey()
  );
  const loadMoreRef = useInfiniteScroll(loadMore, [isLoading, data]);
  const dispatch = useAppDispatch();

  function loadMore() {
    if (data && data[data.length - 1].next) {
      setSize((size) => size + 1);
    }
  }

  function toggleCreate() {
    // setIsCreateOpen((prev) => !prev);
    dispatch(showModal({ name: "createPlaylist" }));
  }

  // Filter out duplicates
  // Function to convert pages to only tracks
  let playlists: SinglePlaylistType[] = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      playlists.push(...data[i].items);
    }
  }

  return (
    <>
      <Heading>Library</Heading>
      <Button size="sm" onClick={toggleCreate}>
        Create playlist
      </Button>
      {!isLoading ? (
        <>
          {data && !error && (
            <>
              {playlists.length > 0 ? (
                <>
                  <Grid>
                    {playlists.map((playlist) => (
                      <Card
                        key={playlist.id}
                        image={
                          playlist.images.length > 0
                            ? playlist.images[0].url
                            : defaultImage
                        }
                        title={playlist.name}
                        subTitle={`by ${playlist.owner.display_name}`}
                        link={`/playlist/${playlist.id}`}
                      />
                    ))}
                  </Grid>
                  <LoadMore ref={loadMoreRef} />
                </>
              ) : (
                <div className="center">
                  <Heading2>Your library is empty</Heading2>
                  <p>It seems like you don't have any playlists yet</p>
                  <Button size="lg" className="flow-xs" onClick={toggleCreate}>
                    Create a playlist
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <Grid>
          {new Array(12).fill("").map((t, i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>
      )}
      <MetaTitle title="Library" />
    </>
  );
}

export default withNetwork(Library);
