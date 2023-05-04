import { useState } from "react";
import useSWR from "swr";
import SingleTrack from "../../../../components/SingleTrack";
import { checkSavedTracks } from "../../../../services/URLCreators";
import { ArtistTracks } from "../../../../types/artist";
import formatDate from "../../../../helpers/formatDate";
import { MoreButton, TracksWrapper } from "./ExpandableTracks.styles";
import { flatFetcher } from "../../../../services/fetcher";
import useTrackMutators from "../../../../hooks/useTrackMutators";
import IncludeSaving from "../../../../components/IncludeSaving";

interface ExpandableTracksProps {
  tracksData: ArtistTracks;
}

function ExpandableTracks({ tracksData }: ExpandableTracksProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: savedData } = useSWR<boolean[]>(
    tracksData && {
      urls: checkSavedTracks(tracksData.tracks.map((track) => track.id)),
    },
    flatFetcher
  );

  const { save, unSave, addToPlaylist } = useTrackMutators();

  return (
    <>
      <TracksWrapper
        style={{
          height:
            tracksData.tracks.length > 5
              ? !isExpanded
                ? `${74 * 5}px`
                : `${74 * tracksData.tracks.length}px`
              : "100%",
          transition: "all 0.4s",
        }}
      >
        <IncludeSaving ids={tracksData.tracks.map((track) => track.id)}>
          {tracksData.tracks.map((track, index) => (
            <SingleTrack
              key={track.id}
              index={index}
              trackData={track}
              secondMeta={formatDate(track.album!.release_date)}
              isSaved={savedData && savedData[index]}
              save={save}
              unSave={unSave}
              addToPlaylist={addToPlaylist}
            />
          ))}
        </IncludeSaving>
      </TracksWrapper>
      {tracksData.tracks.length > 5 && (
        <MoreButton
          onClick={() => setIsExpanded((prev) => !prev)}
          className="reset-button"
        >
          Show {!isExpanded ? "all" : "less"}
        </MoreButton>
      )}
    </>
  );
}

export default ExpandableTracks;
