import { useParams } from "react-router-dom";
// SWR
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
// Config
import { base_api_url } from "../../../../config/api";
// Hooks
import useInfiniteScroll, {
  LoadMore,
} from "../../../../hooks/useInfiniteScroll";
// Services
import { getAlbumsByArtist, getArtist } from "../../../../services/URLCreators";
// Components
import Card from "../../../../components/ui/Card";
import Heading from "../../../../components/ui/Heading";
import { SkeletonCard, SkeletonH1 } from "../../../../components/ui/Skeletons";
// Assets
import defaultImage from "../../../../assets/default_playlist.jpg";
// Styles
import { Grid } from "../../../Genre/Genre.styles";
// Types
import { Groups, SingleAlbumList } from "../../../../types/album";
import { ArtistAlbums, ArtistType } from "../../../../types/artist";

function getKey(id: string | undefined, filter: Groups[]) {
  if (!id) {
    throw new Error("ID not passed");
  }
  return (currentPageIndex: number, previousData: ArtistAlbums) => {
    // If is first return base api
    if (!previousData)
      return { urls: base_api_url + getAlbumsByArtist(id, filter) };

    // Return next page - track.next
    if (previousData.next) return { urls: previousData.next };

    return null;
  };
}

interface AlbumsProps {
  titleCb: (artist: ArtistType) => string;
  filter: Groups[];
}

function Albums({ titleCb, filter }: AlbumsProps) {
  const { id } = useParams();
  const { data: infoData, isLoading: isLoadingInfo } = useSWR<ArtistType>(
    id && { urls: base_api_url + getArtist(id) }
  );
  const {
    data: albumsData,
    isLoading: isLoadingAlbums,
    setSize,
  } = useSWRInfinite<ArtistAlbums>(getKey(id, filter));
  const loadMoreRef = useInfiniteScroll(loadMore, [isLoadingAlbums]);

  function loadMore() {
    setSize((size) => size + 1);
  }

  // Filter out duplicates
  // Function to convert pages to only tracks
  let albums: SingleAlbumList[] = [];
  if (albumsData) {
    for (let i = 0; i < albumsData.length; i++) {
      albumsData[i].items.forEach((item) => {
        if (item && !albums.find((i) => i.id === item.id)) {
          albums.push(item);
        }
      });
    }
  }

  return (
    <>
      {!isLoadingInfo && !isLoadingAlbums ? (
        <>
          {infoData && albumsData && (
            <>
              <Heading>{titleCb(infoData)}</Heading>
              <Grid>
                {albums.map((item) => (
                  <Card
                    key={item.id}
                    image={
                      item.images.length > 0 ? item.images[0].url : defaultImage
                    }
                    title={item.name}
                    link={`/album/${item.id}`}
                  />
                ))}
              </Grid>
              <LoadMore ref={loadMoreRef} />
            </>
          )}
        </>
      ) : (
        <>
          <SkeletonH1 />
          <Grid>
            {new Array(12).fill("").map((t) => (
              <SkeletonCard />
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default Albums;
