import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, MoreHorizontal, Pause, Play, PlusCircle } from "react-feather";
import PopperMenu from "../../../../components/ui/PopperMenu";
import BREAKPOINTS from "../../../../constants/breakpoints";
import { usePlayer } from "../../../../context/Player/PlayerProvider";
import useWindowSize from "../../../../hooks/useWindowSize";
import { selectPlaybar } from "../../../../slices/playbar";
import { selectRemote } from "../../../../slices/remote";
import { useAppSelector } from "../../../../store/hooks";
import { ActionButton, ButtonsFlex } from "../../Playbar.styles";
import useSave from "../../hooks/useSave";
import ExtendedPlaybar from "../ExtendedPlaybar";
import TrackActions from "../TrackActions";
import TrackInfo from "../TrackInfo";
import { Wrapper } from "./InRoomPlaybar.styles";

interface InRoomPlaybarProps {
  openPlaylistModal: () => void;
}

function InRoomPlaybar({ openPlaylistModal }: InRoomPlaybarProps) {
  const [isExtended, setIsExtended] = useState(false);
  const [isMenuOpen, setmenuOpen] = useState(false);
  const playbar = useAppSelector(selectPlaybar);
  const remote = useAppSelector(selectRemote);
  const { width } = useWindowSize();
  const { isSaved, handleSave } = useSave(
    playbar.currentTrack.id,
    playbar.currentTrack.uri
  );
  const { playerActions } = usePlayer();
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  function handlePlayPause() {
    playerActions.togglePlay();
  }

  function openExpanded() {
    setIsExtended(true);
  }

  function closeExpanded() {
    setIsExtended(false);
  }

  return (
    <>
      <Wrapper onClick={remote.isModerator ? openExpanded : () => {}}>
        <TrackInfo
          images={playbar.currentTrack.album.images}
          name={playbar.currentTrack.name}
          artists={playbar.currentTrack.artists}
          isLoading={!!!playbar.currentTrack.id}
        />
        {remote.isModerator ? (
          <div className="no-shrink">
            {width > BREAKPOINTS.mobile ? (
              <TrackActions
                isPaused={playbar.playState.isPaused}
                isShuffle={playbar.playState.isShuffle}
                repeatMode={playbar.playState.repeatMode}
                handlePlayPause={handlePlayPause}
                handleShuffle={playerActions.toggleShuffle}
                handleRepeat={playerActions.changeRepeatMode}
                handleToNext={playerActions.skipToNext}
                handleToPrev={playerActions.skipToPrev}
                isDisabled={!!!playbar.currentTrack.id}
              />
            ) : (
              <ActionButton
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
              >
                {playbar.playState.isPaused ? (
                  <Play style={{ transform: "translateX(2px)" }} />
                ) : (
                  <Pause />
                )}
              </ActionButton>
            )}
          </div>
        ) : (
          <>
            {width < BREAKPOINTS.md_laptop ? (
              <button
                className="reset-button"
                onClick={() => setmenuOpen(true)}
                ref={menuBtnRef}
              >
                <MoreHorizontal />
              </button>
            ) : (
              <ButtonsFlex>
                <button className="reset-button" onClick={handleSave}>
                  <Heart className={isSaved ? "filled" : ""} />
                </button>
                <button className="reset-button" onClick={openPlaylistModal}>
                  <PlusCircle />
                </button>
              </ButtonsFlex>
            )}
          </>
        )}
      </Wrapper>
      <AnimatePresence>
        {isExtended && (
          <ExtendedPlaybar
            openPlaylistModal={openPlaylistModal}
            closeExpanded={closeExpanded}
          />
        )}
      </AnimatePresence>
      {remote.isListener && width < BREAKPOINTS.md_laptop && (
        <PopperMenu
          title={playbar.currentTrack.name}
          image={playbar.currentTrack.album.images[0].url}
          isOpen={isMenuOpen}
          handleClose={() => setmenuOpen(false)}
          ref={menuBtnRef}
          mobileOnly
        >
          <PopperMenu.Item>Save track</PopperMenu.Item>
          <PopperMenu.Item>Add track to playlist</PopperMenu.Item>
        </PopperMenu>
      )}
    </>
  );
}

export default InRoomPlaybar;
