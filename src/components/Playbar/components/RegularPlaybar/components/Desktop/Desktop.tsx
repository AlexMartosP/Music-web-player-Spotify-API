import { useRef, useState } from "react";
import { Link } from "react-router-dom";
// Redux
import { selectPlaybar } from "../../../../../../slices/playbar";
import { selectRemote } from "../../../../../../slices/remote";
import { useAppSelector } from "../../../../../../store/hooks";
// Context
import { usePlayer } from "../../../../../../context/Player/PlayerProvider";
// Hooks
import useSave from "../../../../hooks/useSave";
// Component
import DevicesModule from "../../../DevicesModal";
import TrackActions from "../../../TrackActions";
import TrackInfo from "../../../TrackInfo";
import PlaybackTracker from "../../../../../PlaybackTracker";
import VolumeTracker from "../../../../../VolumeTracker";
import ClickAwayListener from "../../../../../ui/ClickAwayListener";
// Icons
import {
  Disc,
  Heart,
  Layers,
  PlusCircle,
  Speaker,
  Volume2,
} from "react-feather";
// Assets
import gradientBg from "../../../../../../assets/gradient_bg.svg";
// Styles
import { ButtonsFlex, RemoteWrapper } from "../../../../Playbar.styles";
import { Left, Middle, Right, Wrapper } from "./Desktop.styles";

interface DesktopProps {
  openPlaylistModal: () => void;
}
function Desktop({ openPlaylistModal }: DesktopProps) {
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isDeviceOpen, setIsDeviceOpen] = useState(false);
  const playbar = useAppSelector(selectPlaybar);
  const remote = useAppSelector(selectRemote);
  const { isSaved, handleSave } = useSave(
    playbar.currentTrack.id,
    playbar.currentTrack.uri
  );
  const volumeRef = useRef<HTMLButtonElement>(null);
  const deviceRef = useRef<HTMLButtonElement>(null);
  const { localVolume, handleVolumeChange, isInitLoading, playerActions } =
    usePlayer();

  return (
    <>
      <Wrapper isRemote={remote.isRemote}>
        <Left>
          <div className="flex-1">
            <TrackInfo
              images={playbar.currentTrack.album.images}
              name={playbar.currentTrack.name}
              artists={playbar.currentTrack.artists}
              isLoading={isInitLoading}
            />
          </div>
          <ButtonsFlex>
            <button
              className="reset-button"
              onClick={handleSave}
              disabled={isInitLoading}
            >
              <Heart className={isSaved ? "filled" : ""} />
            </button>
            <button
              className="reset-button"
              onClick={openPlaylistModal}
              disabled={isInitLoading}
            >
              <PlusCircle />
            </button>
          </ButtonsFlex>
        </Left>
        <Middle>
          <TrackActions
            isPaused={playbar.playState.isPaused}
            isShuffle={playbar.playState.isShuffle}
            repeatMode={playbar.playState.repeatMode}
            handlePlayPause={playerActions.togglePlay}
            handleRepeat={playerActions.changeRepeatMode}
            handleShuffle={playerActions.toggleShuffle}
            handleToNext={playerActions.skipToNext}
            handleToPrev={playerActions.skipToPrev}
            isDisabled={isInitLoading}
          />
          <PlaybackTracker
            duration={playbar.playState.duration}
            handleSeekTo={(seekValue: number) => playerActions.seek(seekValue)}
            isDisabled={isInitLoading}
          />
        </Middle>
        <Right>
          <Link to="/queue">
            <Layers />
          </Link>
          <div className="relative">
            <button
              className="reset-button"
              onClick={() => setIsVolumeOpen((prev) => !prev)}
              ref={volumeRef}
            >
              <Volume2 />
            </button>
            {isVolumeOpen && (
              <ClickAwayListener
                handleClose={() => setIsVolumeOpen(false)}
                ref={volumeRef}
                preventCloseInside
                preventScroll={false}
              >
                <VolumeTracker
                  currentVolume={localVolume}
                  handleVolumeChange={handleVolumeChange}
                  isDisabled={!playbar.isActive}
                />
              </ClickAwayListener>
            )}
          </div>
          <div className="relative">
            <button
              className="reset-button"
              onClick={() => setIsDeviceOpen((prev) => !prev)}
              ref={deviceRef}
            >
              <Speaker />
            </button>
            {isDeviceOpen && (
              <ClickAwayListener
                ref={deviceRef}
                handleClose={() => setIsDeviceOpen(false)}
                preventScroll={false}
              >
                <DevicesModule />
              </ClickAwayListener>
            )}
          </div>
        </Right>
      </Wrapper>
      {remote.isModerator && (
        <RemoteWrapper>
          <div className="left">
            <Disc />
            <span>Livestreaming to “Remote play” party</span>
          </div>
          <span>{remote.roomInfo.listeners} listeners</span>
          <img src={gradientBg} alt="gradient bg" aria-hidden="true" />
        </RemoteWrapper>
      )}
    </>
  );
}

export default Desktop;
