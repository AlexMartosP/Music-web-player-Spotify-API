import Modal from "../../ui/Modal";
import { hideModal, selectModal } from "../../../slices/modal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import CreatePlaylistModal from "../CreatePlaylistModule";
import CreateRoomModal from "../CreateRoomModal";
import SelectPlaylistModal from "../SelectPlaylistModal";

function GlobalModal() {
  const modal = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(hideModal());
  }

  let currentModal = null;
  switch (modal.current) {
    case "selectPlaylist":
      currentModal = (
        <SelectPlaylistModal uri={modal.props.uri} handleClose={handleClose} />
      );
      break;

    case "createPlaylist":
      currentModal = <CreatePlaylistModal handleClose={handleClose} />;
      break;
    case "createRoom":
      currentModal = <CreateRoomModal handleClose={handleClose} />;
      break;
  }

  return (
    <>
      {currentModal && <Modal handleClose={handleClose}>{currentModal}</Modal>}
    </>
  );
}

export default GlobalModal;
