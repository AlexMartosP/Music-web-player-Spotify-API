import useSWRImmutable from "swr/immutable";
import { checkSavedTracks } from "../../../services/URLCreators";
import { flatFetcher } from "../../../services/fetcher";
import useTrackMutators from "../../../hooks/useTrackMutators";

function useSave(id: string | null, uri: string | null) {
  const { data } = useSWRImmutable<boolean[]>(
    id && {
      type: "savings",
      key: id,
      urls: checkSavedTracks([id]),
    },
    flatFetcher
  );
  const { save, unSave } = useTrackMutators();

  function handleSave() {
    if (data && id && uri) {
      if (!data[0]) {
        save(id || uri.split(":")[2]);
      } else {
        unSave(id || uri.split(":")[2]);
      }
    }
  }

  return {
    isSaved: data && data[0],
    handleSave,
  };
}

export default useSave;
