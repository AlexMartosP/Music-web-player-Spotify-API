import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// Firebase
import { Unsubscribe, collection, onSnapshot, query } from "firebase/firestore";
// Redux
import { showModal } from "../../slices/modal";
import { selectPlaybar, transfer } from "../../slices/playbar";
import { selectRemote } from "../../slices/remote";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// Config
import db from "../../config/firebase";
// HOC
import withNetwork from "../../HOC/withNetwork";
// Components
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import Heading2 from "../../components/ui/Heading2";
import Modal from "../../components/ui/Modal";
import { SkeletonH2, SkeletonText } from "../../components/ui/Skeletons";
// Icons
import { Eye } from "react-feather";
// Styles
import {
  ActionWrapper,
  CountWrapper,
  InfoWrapper,
  MetaWrapper,
  Wrapper,
} from "./BrowseRooms.styles";
// Types
import { RoomType } from "../../types/remote";

function BrowseRooms() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transferModal, setTransferModal] = useState<{
    open: boolean;
    onTransfer: (() => void) | null;
  }>({ open: false, onTransfer: null });
  const playbar = useAppSelector(selectPlaybar);
  const remote = useAppSelector(selectRemote);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    async function getRooms() {
      const q = query(collection(db, "rooms"));
      unsubscribe = onSnapshot(q, (roomsSnapshot) => {
        let rooms: RoomType[] = [];
        roomsSnapshot.forEach((room) => {
          rooms.push({ ...(room.data() as RoomType), id: room.id });
        });
        setRooms(rooms);

        if (isLoading) {
          setIsLoading(false);
        }
      });
    }

    if (!remote.isRemote) {
      getRooms();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  function handleOpenCreate() {
    if (!playbar.isActive) {
      setTransferModal({
        open: true,
        onTransfer: () => dispatch(showModal({ name: "createRoom" })),
      });
      return;
    }
    dispatch(showModal({ name: "createRoom" }));
  }

  function handleJoin(id: string) {
    // If active - navigate
    if (playbar.isActive) {
      return navigate(`/in-room/${id}`);
    }

    setTransferModal({
      open: true,
      onTransfer: () => navigate(`/in-room/${id}`),
    });
  }

  async function handleTransfer() {
    await dispatch(transfer(playbar.deviceId));
    closeTranserModal();
    if (transferModal.onTransfer) {
      transferModal.onTransfer();
    }
  }

  function closeTranserModal() {
    setTransferModal({ open: false, onTransfer: null });
  }

  return (
    <>
      {!remote.isRemote ? (
        <>
          <Heading>Party rooms</Heading>
          <Button className="flow-xs" size="sm" onClick={handleOpenCreate}>
            Create room
          </Button>
          <div className="flow">
            {!isLoading ? (
              <>
                {rooms.length > 0 ? (
                  <>
                    {rooms.map((room) => (
                      <Wrapper key={room.id} className="flow">
                        <InfoWrapper>
                          <Heading2>{room.name}</Heading2>
                          <p>{room.description}</p>
                        </InfoWrapper>
                        <ActionWrapper>
                          <MetaWrapper>
                            <span className="label">LIVE</span>
                            <CountWrapper>
                              <Eye />
                              <span>{room.listeners}</span>
                            </CountWrapper>
                          </MetaWrapper>
                          <Button size="lg" onClick={() => handleJoin(room.id)}>
                            Join party
                          </Button>
                        </ActionWrapper>
                      </Wrapper>
                    ))}
                  </>
                ) : (
                  <span>There are no live Party rooms right now</span>
                )}
              </>
            ) : (
              <>
                {new Array(4).fill("").map((t, i) => (
                  <div className="flow-end" key={i}>
                    <SkeletonH2 />
                    <SkeletonText />
                  </div>
                ))}
              </>
            )}
          </div>
          {transferModal.open && (
            <Modal handleClose={closeTranserModal}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Heading2>Please transfer</Heading2>
                <p>
                  This player has to be active to be able to create a party
                  room.
                </p>
                <Button className="flow-xxs" onClick={handleTransfer}>
                  Transfer
                </Button>
              </div>
            </Modal>
          )}
        </>
      ) : (
        <Navigate to={`/in-room/${remote.roomInfo.id}`} replace />
      )}
    </>
  );
}

export default withNetwork(BrowseRooms);
