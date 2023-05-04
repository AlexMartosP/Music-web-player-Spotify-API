import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
// Framer motion
import { AnimatePresence } from "framer-motion";
// Redux
import { selectPlaybar } from "../../../../slices/playbar";
import { useAppSelector } from "../../../../store/hooks";
// Hooks
import { usePlayer } from "../../../../context/Player/PlayerProvider";
import useSave from "../../hooks/useSave";
// Components
import PopperMenu from "../../../../components/ui/PopperMenu";
import PlaybackTracker from "../../../PlaybackTracker";
import Devices from "./components/Devices";
// Icons
import {
  ChevronDown,
  Disc,
  Heart,
  Layers,
  MoreHorizontal,
  Pause,
  Play,
  PlusCircle,
  Repeat,
  Share,
  Shuffle,
  SkipBack,
  SkipForward,
  Speaker,
  User,
} from "react-feather";
// Styles
import { ActionButton } from "../../Playbar.styles";
import {
  BackgroundImage,
  Bottom,
  ContentWrapper,
  ImageWrapper,
  MoreMenuButton,
  Playback,
  Top,
  TrackInfo,
  Wrapper,
} from "./ExtendedPlaybar.styles";

interface ExtendedPlaybar {
  openPlaylistModal: () => void;
  closeExpanded: () => void;
}

function ExtendedPlaybar({
  openPlaylistModal,
  closeExpanded,
}: ExtendedPlaybar) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isDevicesOpen, setIsDevicesOpen] = useState(false);
  const { currentTrack, playState, nextTrack, previousTrack } =
    useAppSelector(selectPlaybar);
  const { isSaved, handleSave } = useSave(currentTrack.id, currentTrack.uri);
  const navigate = useNavigate();
  const { isInitLoading, playerActions } = usePlayer();
  const moreMenuBtnRef = useRef<HTMLButtonElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  function toggleMoreMenu() {
    setIsMoreMenuOpen((prev) => !prev);
  }

  function closeMoreMenu() {
    setIsMoreMenuOpen(false);
  }

  function handleQueueClick() {
    closeExpanded();
    navigate("/queue");
  }

  useEffect(() => {
    if (coverRef.current && previousTrack[0]) {
      coverRef.current?.scrollTo({
        left: coverRef.current.scrollWidth / 3,
      });
    }

    const previousObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          playerActions.skipToPrev();
        }
      },
      {
        threshold: 1.0,
      }
    );

    const nextObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          playerActions.skipToNext();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (previousRef.current) {
      previousObserver.observe(previousRef.current);
    }

    if (nextRef.current) {
      nextObserver.observe(nextRef.current);
    }
  }, [currentTrack.id]);

  return createPortal(
    <>
      <Wrapper
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "150%" }}
        transition={{ duration: 0.3 }}
        hasImage={!!currentTrack.album.images}
      >
        <ContentWrapper>
          <Top>
            <button className="reset-button" onClick={closeExpanded}>
              <ChevronDown />
            </button>
            <h4 className="clip-text">{currentTrack.name}</h4>
            <button
              className="reset-button"
              ref={moreMenuBtnRef}
              onClick={toggleMoreMenu}
            >
              <MoreHorizontal />
            </button>
          </Top>
          <ImageWrapper>
            <div className="inner" ref={coverRef}>
              {previousTrack.length > 0 && (
                <div className="image-con" ref={previousRef}>
                  <img
                    src={
                      (previousTrack[1] || previousTrack[0]).album.images[0].url
                    }
                    alt=""
                    draggable="false"
                  />
                </div>
              )}
              <div className="image-con">
                <img
                  src={currentTrack.album.images[0].url}
                  alt=""
                  draggable="false"
                />
              </div>
              {nextTrack.length > 0 && (
                <div className="image-con" ref={nextRef}>
                  <img
                    src={nextTrack[0].album.images[0].url}
                    alt=""
                    draggable="false"
                  />
                </div>
              )}
            </div>
          </ImageWrapper>
          <TrackInfo>
            <div>
              <h4 className="clip-text">{currentTrack.name}</h4>
              <span className="clip-text">
                {currentTrack.artists.map((artist) => artist.name).join(", ")}
              </span>
            </div>
            <button className="reset-button no-shrink" onClick={handleSave}>
              <Heart className={isSaved ? "filled" : ""} />
            </button>
          </TrackInfo>
          <PlaybackTracker
            duration={playState.duration}
            handleSeekTo={(seekValue) => playerActions.seek(seekValue)}
            isDisabled={isInitLoading}
          />
          <Playback>
            <button
              className="reset-button"
              onClick={playerActions.toggleShuffle}
            >
              <Shuffle color={playState.isShuffle ? "#00D1FF" : "#fff"} />
            </button>
            <div>
              <button
                className="reset-button"
                onClick={playerActions.skipToPrev}
              >
                <SkipBack />
              </button>
              <ActionButton onClick={() => playerActions.togglePlay()}>
                {playState.isPaused ? <Play className="right" /> : <Pause />}
              </ActionButton>
              <button
                className="reset-button"
                onClick={playerActions.skipToNext}
              >
                <SkipForward />
              </button>
            </div>
            <button
              className="reset-button"
              onClick={playerActions.changeRepeatMode}
            >
              <Repeat color={playState.repeatMode > 0 ? "#00D1FF" : "#fff"} />
            </button>
          </Playback>
          <Bottom>
            <button
              className="reset-button"
              onClick={() => setIsDevicesOpen(true)}
            >
              <Speaker />
            </button>
            <div>
              <button className="reset-button">
                <Share />
              </button>
              <button className="reset-button" onClick={handleQueueClick}>
                <Layers />
              </button>
            </div>
          </Bottom>
        </ContentWrapper>
        {currentTrack.album.images.length > 0 && (
          <>
            <BackgroundImage src={currentTrack.album.images[0].url} alt="" />
          </>
        )}
      </Wrapper>
      <AnimatePresence>
        {isDevicesOpen && (
          <Devices
            closeDevices={() => {
              setIsDevicesOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <PopperMenu
        isOpen={isMoreMenuOpen}
        title={currentTrack.name}
        image={currentTrack.album.images[0].url}
        handleClose={closeMoreMenu}
        ref={moreMenuBtnRef}
        mobileOnly
      >
        <MoreMenuButton className="reset-button" onClick={openPlaylistModal}>
          <PlusCircle />
          <span>Add to playlist</span>
        </MoreMenuButton>
        <MoreMenuButton className="reset-button">
          <Layers />
          <span>Add to queue</span>
        </MoreMenuButton>
        <MoreMenuButton
          as={Link}
          to={`/album/${currentTrack.album.uri.split(":")[2]}`}
          onClick={closeExpanded}
          className="reset-button"
        >
          <Disc />
          <span>Go to album</span>
        </MoreMenuButton>
        {currentTrack.artists.length > 1 ? (
          <PopperMenu.Expandable
            label={
              <MoreMenuButton className="reset-button">
                <User />
                <span>Go to artist</span>
              </MoreMenuButton>
            }
            mobileHeading="Artists"
          >
            {currentTrack.artists.map((artist) => (
              <Link
                key={artist.uri}
                to={`/artist/${artist.uri.split(":")[2]}`}
                onClick={closeExpanded}
              >
                <span>{artist.name}</span>
              </Link>
            ))}
          </PopperMenu.Expandable>
        ) : (
          <MoreMenuButton
            className="reset-button"
            as={Link}
            to={`/artist/${currentTrack.artists[0].uri.split(":")[2]}`}
            onClick={closeExpanded}
          >
            <User />
            <span>Go to artist</span>
          </MoreMenuButton>
        )}

        <MoreMenuButton className="reset-button">
          <Share />
          <span>Share</span>
        </MoreMenuButton>
      </PopperMenu>
    </>,
    document.getElementById("portal")!
  );
}

export default ExtendedPlaybar;
