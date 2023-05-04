import { ChangeEvent, useState } from "react";
import { Search, X } from "react-feather";
// SWR
import useSWRInfinite from "swr/infinite";
// Hooks
import useNetwork from "../../../hooks/useNetwork";
import useTrackMutators from "../../../hooks/useTrackMutators";
// Services
import getUserPlaylistsKey from "../../../services/keyGetters/getMultiplePlaylistsKey";
// Components
import { SkeletonImage, SkeletonText } from "../../ui/Skeletons";
import NoNetwork from "../../NoNetwork";
// Assets
import defaultImage from "../../../assets/default_playlist.jpg";
// Styles
import {
  Flex,
  Input,
  InputWrapper,
  LoadingWrapper,
  Meta,
  SinglePlaylist,
} from "./SelectPlaylistModal.styles";
// Types
import { MultiplePlaylists, SinglePlaylistType } from "../../../types/playlist";
import { useAppSelector } from "../../../store/hooks";
import { selectCurrentUser } from "../../../slices/auth";

interface SelectPlaylistModal {
  uri: string;
  handleClose: () => void;
}

function SelectPlaylistModal({ uri, handleClose }: SelectPlaylistModal) {
  const [input, setInput] = useState("");
  const { data, isLoading } = useSWRInfinite<MultiplePlaylists>(
    getUserPlaylistsKey("50"),
    { initialSize: 10 }
  );
  const { addToPlaylist } = useTrackMutators();
  const user = useAppSelector(selectCurrentUser);
  const isOnline = useNetwork();

  function handleSelect(playlistId: string) {
    addToPlaylist(playlistId, uri);
    handleClose();
  }

  function handleChange(e: ChangeEvent) {
    setInput((e.target as HTMLInputElement).value);
  }

  let outPutData: SinglePlaylistType[] = [];
  if (data) {
    data.forEach((page) => {
      page.items.forEach((item) => {
        if (
          item.name.toLowerCase().includes(input.toLowerCase()) &&
          (item.collaborative || item.owner.id === user.id)
        ) {
          outPutData.push(item);
        }
      });
    });
  }

  return (
    <>
      <Flex>
        <InputWrapper>
          <Search />
          <Input
            type="text"
            placeholder="Find a playlist"
            value={input}
            onChange={handleChange}
          />
        </InputWrapper>
        <button className="reset-button" onClick={() => handleClose()}>
          <X />
        </button>
      </Flex>
      {isOnline ? (
        <>
          {!isLoading && outPutData ? (
            <div className="flow-sm">
              {outPutData.map((item) => (
                <li key={item.id}>
                  <SinglePlaylist
                    className="reset-button"
                    onClick={() => handleSelect(item.id)}
                  >
                    <div className="no-shrink">
                      <img
                        src={
                          item.images.length > 0
                            ? item.images[0].url
                            : defaultImage
                        }
                        alt=""
                      />
                    </div>
                    <div>
                      <h4 className="clip-text">{item.name}</h4>
                      <Meta>
                        <span>by {item.owner.display_name}</span>
                        <div className="dot"></div>
                        <span className="tracks">
                          {item.tracks.total} tracks
                        </span>
                      </Meta>
                    </div>
                  </SinglePlaylist>
                </li>
              ))}
            </div>
          ) : (
            <div className="flow-sm">
              {new Array(8).fill("").map((t, i) => (
                <LoadingWrapper key={i}>
                  <SkeletonImage maxWidth="3.75rem" />
                  <div className="flex-1">
                    <SkeletonText height="0.875rem" width="12rem" />
                    <SkeletonText
                      width="6rem"
                      height="0.5rem"
                      className="flow-xxxs"
                    />
                  </div>
                </LoadingWrapper>
              ))}
            </div>
          )}
        </>
      ) : (
        <NoNetwork />
      )}
    </>
  );
}

export default SelectPlaylistModal;
