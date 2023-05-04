import { MouseEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { selectPlaybar, togglePlay } from "../../../../../../slices/playbar";
import { selectRemote } from "../../../../../../slices/remote";
import { AnimatePresence } from "framer-motion";
import { ActionButton, RemoteWrapper } from "../../../../Playbar.styles";
import { Disc, Pause, Play } from "react-feather";
import gradientBg from "../../../../../../assets/gradient_bg.svg";
import ExtendedPlaybar from "../../../ExtendedPlaybar";
import { Wrapper } from "./Mobile.styles";
import TrackInfo from "../../../TrackInfo";
import { usePlayer } from "../../../../../../context/Player/PlayerProvider";

interface MobileProps {
  openPlaylistModal: () => void;
}

function Mobile({ openPlaylistModal }: MobileProps) {
  const [isExtended, setIsExtended] = useState(false);
  const { playState, currentTrack } = useAppSelector(selectPlaybar);
  const remote = useAppSelector(selectRemote);
  const { isInitLoading, playerActions } = usePlayer();

  function preventedPropigationClick(e: MouseEvent) {
    e.stopPropagation();
    handlePlayPause();
  }

  function openExpanded() {
    if (!isInitLoading) {
      setIsExtended(true);
    }
  }

  function closeExpanded() {
    setIsExtended(false);
  }

  function handlePlayPause() {
    playerActions.togglePlay();
  }

  return (
    <>
      <div onClick={openExpanded}>
        <Wrapper isRemote={remote.isRemote}>
          <TrackInfo
            images={currentTrack.album.images}
            name={currentTrack.name}
            artists={currentTrack.artists}
            isLoading={isInitLoading}
          />
          <ActionButton
            onClick={preventedPropigationClick}
            disabled={isInitLoading}
          >
            {playState.isPaused ? <Play /> : <Pause />}
          </ActionButton>
        </Wrapper>
        {remote.isModerator && (
          <RemoteWrapper>
            <div className="left">
              <Disc />
              <span>Livestreaming to “Remote play” party</span>
            </div>
            <span className="num-of-listeners">
              {remote.roomInfo.listeners} listeners
            </span>
            <img src={gradientBg} alt="gradient bg" aria-hidden="true" />
          </RemoteWrapper>
        )}
      </div>
      <AnimatePresence>
        {isExtended && (
          <ExtendedPlaybar
            openPlaylistModal={openPlaylistModal}
            closeExpanded={closeExpanded}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Mobile;
