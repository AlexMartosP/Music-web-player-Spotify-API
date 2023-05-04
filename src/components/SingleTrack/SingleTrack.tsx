import { MouseEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/default_playlist.jpg";
import BREAKPOINTS from "../../constants/breakpoints";
// Redux
import { selectCurrentUser } from "../../slices/auth";
import { showModal } from "../../slices/modal";
import {
  addToQueue,
  playTrack,
  selectCurrentTrack,
} from "../../slices/playbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// Hooks
import useNetwork from "../../hooks/useNetwork";
import useTrackMutators from "../../hooks/useTrackMutators";
import useWindowSize from "../../hooks/useWindowSize";
// Components
import PopperMenu from "../ui/PopperMenu";
import UnavailableTrack from "./components/UnavailableTrack/UnavailableTrack";
// Utils
import trackIsAvailable from "../../helpers/trackIsAvailable";
// Helpers
import formatTime from "../../helpers/formatTime";
// Icons
import { Heart, MoreHorizontal, Play } from "react-feather";
// Styles
import { ButtonWrapper, MetaWrapper, Wrapper } from "./SingleTrack.styles";
// Types
import { SingleAlbum } from "../../types/album";
import { ImagesType } from "../../types/images";
import { SingleTrackType } from "../../types/track";

interface SingleTrackProps {
  trackData: SingleTrackType | null;
  customImages?: ImagesType[];
  albumData?: SingleAlbum;
  contextURI?: string;
  secondMeta: string;
  playlist?: { own: boolean; id: string };
  index: number;
  isSaved?: boolean;
  save?: any;
  unSave?: any;
  addToPlaylist?: any;
  removeFromPlaylist?: any;
}

function SingleTrack({
  trackData,
  customImages,
  albumData,
  contextURI,
  secondMeta,
  playlist = { own: false, id: "" },
  isSaved,
  index,
}: SingleTrackProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuBtnRef = useRef<HTMLButtonElement>(null);
  const { width } = useWindowSize();
  const user = useAppSelector(selectCurrentUser)!;
  const currentTrack = useAppSelector(selectCurrentTrack);
  const dispatch = useAppDispatch();
  const isOnline = useNetwork({ listenToOffline: true });

  const { save, unSave, removeFromPlaylist } = useTrackMutators();

  if (!trackData) return <UnavailableTrack index={index} />;

  function play(e: MouseEvent) {
    if (!e.defaultPrevented && trackData && isPlayable && isOnline) {
      dispatch(playTrack(contextURI, trackData.uri, index));
    }
  }

  function handleAddToQueue() {
    if (trackData) {
      dispatch(addToQueue(trackData.uri));
    }
  }

  function handleRemoveFromPlaylist() {
    if (trackData) {
      removeFromPlaylist(
        playlist.id,
        trackData.linked_from ? trackData.linked_from.uri : trackData.uri
      );
    }
  }

  function handleSave(e: MouseEvent) {
    e.preventDefault();
    if (trackData) {
      if (!isSaved) {
        save(trackData.id);
      } else {
        unSave(trackData.id);
      }
    }
  }

  function toggleMoreMenu(e: MouseEvent) {
    e.preventDefault();
    setShowMoreMenu((prev) => !prev);
  }

  function closeMoreMenu() {
    setShowMoreMenu(false);
  }

  let isPlayable = false;
  if (typeof trackData?.is_playable !== "undefined") {
    isPlayable = trackData.is_playable;
  } else {
    isPlayable = trackIsAvailable(trackData.available_markets, user.country);
  }

  let image: string = "";
  if (customImages) {
    image = customImages.length > 0 ? customImages[0].url : defaultImage;
  } else if (trackData.album) {
    image =
      trackData.album.images.length > 0
        ? trackData.album!.images[0].url
        : defaultImage;
  }

  return (
    <>
      {trackData && (
        <>
          <Wrapper
            onClick={play}
            role="button"
            disabled={!isPlayable || !isOnline}
          >
            <MetaWrapper>
              {isPlayable && <Play />}
              <span className="number text-gray-small">{index + 1}</span>
              <img src={image} alt="" />
              <div>
                <h4
                  className={`title ${
                    currentTrack.id === trackData.id && "playing"
                  }`}
                >
                  {trackData.name}
                </h4>
                <span className=" artists text-gray-small">
                  {trackData.artists.length > 1
                    ? trackData.artists.map((artist) => artist.name).join(", ")
                    : trackData.artists[0].name}
                </span>
              </div>
            </MetaWrapper>
            {width > BREAKPOINTS.mobile && (
              <>
                <span className="text-gray-small">
                  {formatTime(trackData.duration_ms, true)}
                </span>
                <span className="text-gray-small">{secondMeta}</span>
              </>
            )}
            <ButtonWrapper>
              {width > BREAKPOINTS.mobile && (
                <button onClick={handleSave}>
                  <Heart className={isSaved ? "saved" : ""} />
                </button>
              )}
              <button onClick={toggleMoreMenu} ref={moreMenuBtnRef}>
                <MoreHorizontal />
              </button>
              <PopperMenu
                isOpen={showMoreMenu}
                image={image}
                title={trackData?.name}
                handleClose={closeMoreMenu}
                ref={moreMenuBtnRef}
                onClickInside={(e) => e.preventDefault()}
              >
                <PopperMenu.Start>
                  <PopperMenu.Item onClick={handleAddToQueue}>
                    Add to queue
                  </PopperMenu.Item>
                </PopperMenu.Start>
                {trackData?.artists.length > 1 ? (
                  <PopperMenu.Expandable
                    label="Go to the artist"
                    mobileHeading="Artists"
                  >
                    {trackData?.artists.map((artist) => (
                      <Link key={artist.id} to={`/artist/${artist.id}`}>
                        {artist.name}
                      </Link>
                    ))}
                  </PopperMenu.Expandable>
                ) : (
                  <Link to={`/artist/${trackData.artists[0].id}`}>
                    Go to artist
                  </Link>
                )}

                <Link
                  to={`/album/${
                    trackData?.album ? trackData?.album.id : albumData?.id
                  }`}
                >
                  Go to album
                </Link>
                {width < BREAKPOINTS.mobile && (
                  <PopperMenu.Item onClick={handleSave}>
                    {isSaved ? "Remove from saved tracks" : "Save track"}
                  </PopperMenu.Item>
                )}
                <PopperMenu.Item
                  onClick={() => {
                    dispatch(
                      showModal({
                        name: "selectPlaylist",
                        props: {
                          uri: trackData.linked_from
                            ? trackData.linked_from.uri
                            : trackData.uri,
                        },
                      })
                    );
                  }}
                >
                  Add to playlist
                </PopperMenu.Item>

                {playlist.own && (
                  <PopperMenu.Item onClick={handleRemoveFromPlaylist}>
                    Remove from playlist
                  </PopperMenu.Item>
                )}
                <PopperMenu.End>
                  <Link
                    to={trackData?.external_urls.spotify}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open in Spotify
                  </Link>
                </PopperMenu.End>
              </PopperMenu>
            </ButtonWrapper>
          </Wrapper>
        </>
      )}
    </>
  );
}

export default SingleTrack;
