import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../../../config/firebase";
import {
  RemotehandlersContextType,
  useRemoteHandlers,
} from "../../../context/RemoteHandlers";
import { selectCurrentUser } from "../../../slices/auth";
import { selectPlaybar } from "../../../slices/playbar";
import { useAppSelector } from "../../../store/hooks";
import InputModal from "../InputModal";

interface CreateRoomModalProps {
  handleClose: () => void;
}

function CreateRoomModal({ handleClose }: CreateRoomModalProps) {
  const user = useAppSelector(selectCurrentUser)!;
  const playbar = useAppSelector(selectPlaybar);
  const navigate = useNavigate();
  const { joinAsModerator } = useRemoteHandlers() as RemotehandlersContextType;

  async function createRoom(name: string, description: string) {
    const doc = await addDoc(collection(db, "rooms"), {
      name,
      description,
      listeners: 0,
      messages: [],
      moderator: {
        name: user.display_name,
        id: user.id,
      },
      currentTrack: {
        uri: playbar.currentTrack!.uri,
        isPaused: playbar.playState.isPaused,
        position: playbar.playState.position,
        timestamp: Date.now(),
      },
    });

    await joinAsModerator(doc.id);

    handleClose();
    navigate(`/in-room/${doc.id}`, { replace: true });
  }

  return (
    <InputModal
      title="Create room"
      onSubmit={createRoom}
      onClose={handleClose}
      descriptionRequired
    />
  );
}

export default CreateRoomModal;
