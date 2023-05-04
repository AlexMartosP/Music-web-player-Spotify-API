import { useNavigate } from "react-router-dom";
import { base_api_url } from "../../../config/api";
import mutateFetcher from "../../../services/mutateFetcher";
import { selectCurrentUser } from "../../../slices/auth";
import { useAppSelector } from "../../../store/hooks";
import InputModal from "../InputModal";

interface CreatePlaylistModalProps {
  handleClose: () => void;
}

function CreatePlaylistModal({ handleClose }: CreatePlaylistModalProps) {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  function handleCreate(name: string, description: string) {
    mutateFetcher(base_api_url + `/users/${user!.id}/playlists`, "POST", {
      name,
      description,
    }).then((data) => {
      handleClose();
      navigate(`/playlist/${data.id}`);
    });
  }

  return (
    <InputModal
      title="Create playlist"
      onSubmit={handleCreate}
      onClose={handleClose}
      descriptionRequired
    />
  );
}

export default CreatePlaylistModal;
