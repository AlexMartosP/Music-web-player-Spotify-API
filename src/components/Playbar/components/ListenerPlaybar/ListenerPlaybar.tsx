import { useRef, useState } from "react";
import {
  Disc,
  Heart,
  MoreHorizontal,
  PlusCircle,
  Volume2,
} from "react-feather";
import gradientBg from "../../../../assets/gradient_bg.svg";
import PopperMenu from "../../../../components/ui/PopperMenu";
import BREAKPOINTS from "../../../../constants/breakpoints";
import { usePlayer } from "../../../../context/Player/PlayerProvider";
import { useRemoteHandlers } from "../../../../context/RemoteHandlers";
import useWindowSize from "../../../../hooks/useWindowSize";
import { selectPlaybar } from "../../../../slices/playbar";
import { useAppSelector } from "../../../../store/hooks";
import VolumeTracker from "../../../VolumeTracker";
import ClickAwayListener from "../../../ui/ClickAwayListener";
import { ActionButton, ButtonsFlex, RemoteWrapper } from "../../Playbar.styles";
import useSave from "../../hooks/useSave";
import TrackInfo from "../TrackInfo";
import { RemoteButtonsFlex, Right, Wrapper } from "./ListenerPlaybar.styles";

interface ListenerPlaybarProps {
  openPlaylistModal: () => void;
}

function ListenerPlaybar({ openPlaylistModal }: ListenerPlaybarProps) {
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isMenuOpen, setmenuOpen] = useState(false);
  const playbar = useAppSelector(selectPlaybar);
  const { isInitLoading } = usePlayer();
  const { isSaved, handleSave } = useSave(
    playbar.currentTrack.id,
    playbar.currentTrack.uri
  );
  const { width } = useWindowSize();
  const volumeRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const { leave, sync } = useRemoteHandlers();

  return (
    <>
      <Wrapper isRemote>
        <TrackInfo
          images={playbar.currentTrack.album.images}
          name={playbar.currentTrack.name}
          artists={playbar.currentTrack.artists}
          isLoading={isInitLoading}
        />
        <Right>
          <div className="relative">
            <ActionButton
              onClick={() => setIsVolumeOpen((prev) => !prev)}
              ref={volumeRef}
            >
              <Volume2 />
            </ActionButton>
            {isVolumeOpen && (
              <ClickAwayListener
                handleClose={() => setIsVolumeOpen(false)}
                ref={volumeRef}
                preventCloseInside
                preventScroll={false}
              >
                <VolumeTracker isDisabled={!playbar.isActive} />
              </ClickAwayListener>
            )}
          </div>
          {width < BREAKPOINTS.md_laptop ? (
            <button
              className="reset-button"
              onClick={() => setmenuOpen((prev) => !prev)}
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
        </Right>
      </Wrapper>
      <RemoteWrapper>
        <div className="left">
          <Disc />
          <span>Listening to “Remote play” party</span>
        </div>
        <RemoteButtonsFlex>
          <button className="reset-button sync" onClick={sync}>
            Sync
          </button>
          <button className="reset-button leave" onClick={leave}>
            Leave {width > BREAKPOINTS.mobile && "party"}
          </button>
        </RemoteButtonsFlex>
        <img src={gradientBg} alt="gradient bg" aria-hidden="true" />
      </RemoteWrapper>
      {width < BREAKPOINTS.md_laptop && (
        <PopperMenu
          title={playbar.currentTrack.name}
          image={playbar.currentTrack.album.images[0].url}
          isOpen={isMenuOpen}
          handleClose={() => setmenuOpen(false)}
          ref={menuBtnRef}
          mobileOnly
        >
          <PopperMenu.Item onClick={handleSave}>
            {isSaved ? "Unsave track" : "Save track"}
          </PopperMenu.Item>
          <PopperMenu.Item onClick={openPlaylistModal}>
            Add track to playlist
          </PopperMenu.Item>
        </PopperMenu>
      )}
    </>
  );
}

export default ListenerPlaybar;
