import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// Redux
import { selectPlaybar } from "../../slices/playbar";
import { selectRemote } from "../../slices/remote";
import { useAppSelector } from "../../store/hooks";
// Context
import { usePlayer } from "../../context/Player/PlayerProvider";
import { useRemoteHandlers } from "../../context/RemoteHandlers";
import { useSnackbars } from "../../context/Snackbar/SnackbarProvider";
// Hooks
import useWindowSize from "../../hooks/useWindowSize";
// HOC
import withNetwork from "../../HOC/withNetwork";
// Components
import ListenerCounter from "../../components/ListenerCounter";
import Playbar from "../../components/Playbar";
import Button from "../../components/ui/Button";
import Heading2 from "../../components/ui/Heading2";
import CommentInput from "./components/CommentInput";
import CommentsSection from "./components/CommentsSection";
// Constants
import BREAKPOINTS from "../../constants/breakpoints";
// Images
import blobs_2 from "../../assets/blobs_2.jpg";
// Icons
import { Info, RefreshCcw, Share, X } from "react-feather";
// Styles
import {
  BottomWrapper,
  ButtonsWrapper,
  CommentWrapper,
  LoadingWrapper,
  MetaWrapper,
  PausedNoteWrapper,
  TrackWrapper,
  Wrapper,
} from "./InRoom.styles";

function InRoom() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const playbar = useAppSelector(selectPlaybar);
  const remote = useAppSelector(selectRemote);
  const { join, sync, leaveAsModerator, leave } = useRemoteHandlers();
  const { enqueueSnackbar } = useSnackbars();
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const { playerActions } = usePlayer();

  useEffect(() => {
    async function joinRoon() {
      try {
        if (id) {
          await join(id);
        }
        setError(false);
      } catch (error) {
        setError(true);
      }
    }

    if (
      ((!remote.isListener && !remote.isModerator) ||
        (id && id !== remote.roomInfo.id)) &&
      playbar.isActive
    ) {
      // Leave if change room
      joinRoon();
    }
  }, []);

  function handleLeave() {
    if (remote.isModerator) {
      leaveAsModerator();
    } else if (remote.isListener) {
      leave();
    }
  }

  useEffect(() => {
    if (!playbar.isActive) {
      handleLeave();
      navigate("/browse-rooms");
      enqueueSnackbar({ body: "This device is not active", type: "WARNING" });
    }
  }, [playbar.isActive]);

  return (
    <>
      {remote.isRemote ? (
        <Wrapper>
          <div className="content">
            <div className="relative top">
              <div>
                <MetaWrapper>
                  <div className="meta">
                    <Heading2 className="name">
                      {remote.roomInfo?.name}
                    </Heading2>
                    <div className="count">
                      <ListenerCounter count={remote.roomInfo!.listeners} />
                    </div>
                    <span className="moderator">
                      by {remote.roomInfo?.moderator.name}
                    </span>
                  </div>
                  <ButtonsWrapper>
                    <button onClick={handleLeave}>
                      <X />
                    </button>
                    <button>
                      <Share />
                    </button>
                    {remote.isListener && (
                      <button onClick={sync}>
                        <RefreshCcw />
                      </button>
                    )}
                  </ButtonsWrapper>
                </MetaWrapper>
                {width > BREAKPOINTS.md_laptop && (
                  <TrackWrapper>
                    <img
                      src={playbar.currentTrack.album.images[0].url}
                      alt=""
                    />
                    <div>
                      <span>Current track</span>
                      <Heading2 className="track-name">
                        {playbar.currentTrack.name}
                      </Heading2>
                      <div className="artists">
                        {playbar.currentTrack.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </div>
                      <Link
                        to={`/album/${
                          playbar.currentTrack.album.uri.split(":")[2]
                        }`}
                      >
                        Go to album
                      </Link>
                    </div>
                  </TrackWrapper>
                )}
              </div>
              <CommentsSection />
              {playbar.playState.isPaused && remote.isListener && (
                <PausedNoteWrapper>
                  <Info />
                  <span>
                    You are currently paused, due to autoplay restriction
                  </span>
                  <button
                    onClick={() => {
                      playerActions.resume()?.then(() => {
                        sync();
                      });
                    }}
                  >
                    Play
                  </button>
                </PausedNoteWrapper>
              )}
              {remote.roomInfo.isPaused && remote.isListener && (
                <PausedNoteWrapper>
                  <Info />
                  <span>
                    The party is currenty paused, it will sync once it resumes.
                  </span>
                </PausedNoteWrapper>
              )}
            </div>
            <BottomWrapper>
              <Playbar isInRoom />
              <CommentWrapper>
                <CommentInput />
              </CommentWrapper>
            </BottomWrapper>
          </div>
          <img src={blobs_2} alt="" />
        </Wrapper>
      ) : (
        <>
          {!error ? (
            <LoadingWrapper>
              <span className="loader"></span>
              <Heading2>Joining room</Heading2>
            </LoadingWrapper>
          ) : (
            <>
              <Heading2>The room does not exists</Heading2>
              <Button className="flow-xs" as={Link} to="/browse-rooms">
                Browse roooms
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default withNetwork(InRoom);
