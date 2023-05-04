import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { checkSavedTracks } from "../services/URLCreators";
import { fetcher, flatFetcher } from "../services/fetcher";
import useInfiniteScroll from "./useInfiniteScroll";
import useTrackMutators from "./useTrackMutators";

function useFetchInfiniteTracks<T>(
  keyGetter: (currentPageIndex: number, previousData: any) => string | null,
  trackFormatter: (data: T[]) => any[],
  idFormatter: (tracks: any[]) => string[]
) {
  const {
    data,
    setSize,
    isLoading,
    error,
    mutate: dataMutate,
  } = useSWRInfinite<T>(keyGetter, fetcher, {
    revalidateAll: false,
    revalidateFirstPage: false,
    keepPreviousData: true,
  });

  let tracks = [];
  let ids = null;
  if (data) {
    tracks = trackFormatter(data);
    ids = idFormatter(tracks);
  }

  const { data: savedData } = useSWR<boolean[]>(
    ids && checkSavedTracks(ids),
    flatFetcher,
    { keepPreviousData: true }
  );

  const { save, unSave, addToPlaylist, removeFromPlaylist } =
    useTrackMutators();

  const loadMoreRef = useInfiniteScroll(loadMore, [isLoading, data]);

  function loadMore() {
    setSize((size) => size + 1);
  }

  return {
    data,
    tracks,
    savedData,
    isLoading,
    error,
    loadMoreRef,
    save,
    unSave,
    addToPlaylist,
    removeFromPlaylist,
  };
}

export default useFetchInfiniteTracks;
