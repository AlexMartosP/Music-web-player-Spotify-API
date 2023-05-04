import { useParams } from "react-router-dom";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import withNetwork from "../../HOC/withNetwork";
import defaultImage from "../../assets/default_playlist.jpg";
import Card from "../../components/ui/Card";
import Heading2 from "../../components/ui/Heading2";
import {
  SkeletonCard,
  SkeletonH1,
  SkeletonText,
} from "../../components/ui/Skeletons";
import { base_api_url } from "../../config/api";
import useInfiniteScroll, { LoadMore } from "../../hooks/useInfiniteScroll";
import { getGenreInfo, getGenrePlaylists } from "../../services/URLCreators";
import { selectCurrentUser } from "../../slices/auth";
import { useAppSelector } from "../../store/hooks";
import { GenreInfo, GenrePlaylists } from "../../types/genre";
import { PlaylistListType } from "../../types/playlist";
import { Grid, InfoWrapper } from "./Genre.styles";
import MetaTitle from "../MetaTitle/MetaTitle";

function getKey(id: string | undefined, market: string) {
  if (!id) {
    throw new Error("ID not passed");
  }
  return (currentPageIndex: number, previousData: GenrePlaylists) => {
    // If is first return base api
    if (!previousData)
      return { urls: base_api_url + getGenrePlaylists(id, market) };

    // Return next page - track.next
    if (previousData.playlists.next)
      return { urls: previousData.playlists.next };

    return null;
  };
}

function Genre() {
  const { id } = useParams();
  const user = useAppSelector(selectCurrentUser);
  const { data: infoData, isLoading: isLoadingInfo } = useSWR<GenreInfo>(
    id && { urls: base_api_url + getGenreInfo(id) }
  );
  const {
    data: playlistsData,
    isLoading: isLoadingPlaylists,
    setSize,
  } = useSWRInfinite<GenrePlaylists>(getKey(id, user.country));

  const ref = useInfiniteScroll(loadMore, [
    playlistsData,
    isLoadingPlaylists,
    infoData,
    isLoadingInfo,
  ]);

  // Include in useInfiniteScroll?
  function loadMore() {
    setSize((size) => size + 1);
  }
  // Filter out duplicates
  // Function to convert pages to only tracks
  let tracks: PlaylistListType[] = [];
  if (playlistsData) {
    for (let i = 0; i < playlistsData.length; i++) {
      playlistsData[i].playlists.items.forEach((item) => {
        if (item && !tracks.find((i) => i.id === item.id)) {
          tracks.push(item);
        }
      });
    }
  }

  return (
    <>
      {!isLoadingInfo && !isLoadingPlaylists ? (
        <>
          {infoData && tracks && (
            <>
              <InfoWrapper>
                <span>Genre</span>
                <h1>{infoData.name}</h1>
              </InfoWrapper>
              {tracks.length > 0 ? (
                <>
                  <Grid>
                    {tracks.map((item) => {
                      return (
                        item && (
                          <Card
                            key={item.id}
                            image={
                              item.images.length > 0
                                ? item.images[0].url
                                : defaultImage
                            }
                            title={item.name}
                            link={`/playlist/${item.id}`}
                          />
                        )
                      );
                    })}
                  </Grid>
                  <LoadMore ref={ref} />
                  <MetaTitle
                    title={infoData ? `Genre - ${infoData.name}` : "Genre"}
                  />
                </>
              ) : (
                <Heading2 className="flow-sm">
                  This genre has no playlists
                </Heading2>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <SkeletonText width="20%" />
          <SkeletonH1 className="flow-xxs" width="30%" />
          <Grid>
            {new Array(12).fill("").map((t, i) => (
              <SkeletonCard key={i} />
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default withNetwork(Genre);
