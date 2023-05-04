import { AnimatePresence } from "framer-motion";
import { showModal } from "../../slices/modal";
import { selectPlaybar } from "../../slices/playbar";
import { selectRemote } from "../../slices/remote";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FixedWrapper } from "./Playbar.styles";
import InRoomPlaybar from "./components/InRoomPlaybar";
import ListenerPlaybar from "./components/ListenerPlaybar";
import RegularPlaybar from "./components/RegularPlaybar/RegularPlaybar";
import UnactivePlaybar from "./components/UnactivePlaybar/UnactivePlaybar";

export interface PlaybarProps {
  isInRoom?: boolean;
}

function Playbar({ isInRoom }: PlaybarProps) {
  const playbar = useAppSelector(selectPlaybar);
  const remote = useAppSelector(selectRemote);
  const dispatch = useAppDispatch();

  function openPlaylistModal() {
    dispatch(
      showModal({
        name: "selectPlaylist",
        props: { uri: playbar.currentTrack.uri },
      })
    );
  }

  return (
    <>
      {!isInRoom ? (
        <AnimatePresence mode="wait">
          <FixedWrapper
            key={playbar.isActive ? "big" : "small"}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            isListening={remote.isListener}
            isSmall={!playbar.isActive}
          >
            {playbar.isActive ? (
              <>
                {!remote.isListener ? (
                  <RegularPlaybar openPlaylistModal={openPlaylistModal} />
                ) : (
                  <ListenerPlaybar openPlaylistModal={openPlaylistModal} />
                )}
              </>
            ) : (
              <UnactivePlaybar />
            )}
          </FixedWrapper>
        </AnimatePresence>
      ) : (
        <InRoomPlaybar openPlaylistModal={openPlaylistModal} />
      )}
    </>
  );
}

export default Playbar;
