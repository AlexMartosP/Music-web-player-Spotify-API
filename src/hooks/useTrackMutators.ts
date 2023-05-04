import { KeyedMutator, useSWRConfig } from "swr";
import { base_api_url } from "../config/api";
import mutateFetcher from "../services/mutateFetcher";
import { unstable_serialize } from "swr/infinite";
import getPlaylistKey from "../services/keyGetters/getPlaylistKey";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../slices/auth";
import getSavedTracksKey from "../services/keyGetters/getSavedTrackesKey";
import { useSnackbars } from "../context/Snackbar/SnackbarProvider";

function useTrackMutators() {
  const { mutate } = useSWRConfig();
  const user = useAppSelector(selectCurrentUser);
  const { enqueueSnackbar } = useSnackbars();

  function save(id: string) {
    let indexes: number[] = [];
    let k = 0;

    mutate(
      (key: any) => {
        if (typeof key === "object" && "type" in key && "key" in key) {
          let index = key.key.split(" ").indexOf(id);

          if (key.type === "savings" && index !== -1) {
            indexes.push(index);
            return true;
          }
        }

        return false;
      },
      (data: any) => {
        const newArray = [...data];
        newArray[indexes[k]] = true;
        k++;
        return newArray;
      },
      {
        revalidate: false,
      }
    );
    mutate(
      (key: any) => {
        if (typeof key === "object" && "type" in key && "key" in key) {
          let index = key.key.split(" ").indexOf(id);

          if (key.type === "savings" && index !== -1) {
            return true;
          }
        }

        return false;
      },
      mutateFetcher(base_api_url + "/me/tracks", "PUT", [id]),
      {
        populateCache: false,
        revalidate: true,
      }
    )
      .then(() => {
        enqueueSnackbar(
          { body: "Track added to Saved tracks", type: "INFO" },
          { replaceDuplication: true, id: "savings" }
        );
      })
      .catch(() => {
        enqueueSnackbar(
          { body: "Something went wrong", type: "ALERT" },
          { replaceDuplication: true, id: "error" }
        );

        let indexes: number[] = [];
        let k = 0;

        mutate(
          (key: any) => {
            if (typeof key === "object" && "type" in key && "key" in key) {
              let index = key.key.split(" ").indexOf(id);

              if (key.type === "savings" && index !== -1) {
                indexes.push(index);
                return true;
              }
            }

            return false;
          },
          (data: any) => {
            const newArray = [...data];
            newArray[indexes[k]] = false;
            k++;
            return newArray;
          },
          {
            revalidate: false,
          }
        );
      });
  }

  function unSave(id: string) {
    let indexes: number[] = [];
    let k = 0;

    mutate(
      (key: any) => {
        if (typeof key === "object" && "type" in key && "key" in key) {
          let index = key.key.split(" ").indexOf(id);

          if (key.type === "savings" && index !== -1) {
            indexes.push(index);
            return true;
          }
        }

        return false;
      },
      (data: any) => {
        const newArray = [...data];
        newArray[indexes[k]] = false;
        k++;
        return newArray;
      },
      {
        revalidate: false,
      }
    );
    mutate(
      (key: any) => {
        if (typeof key === "object" && "type" in key && "key" in key) {
          let index = key.key.split(" ").indexOf(id);

          if (key.type === "savings" && index !== -1) {
            return true;
          }
        }

        return false;
      },
      mutateFetcher(base_api_url + "/me/tracks", "DELETE", [id]),
      {
        populateCache: false,
        revalidate: true,
      }
    )
      .then(() => {
        mutate(unstable_serialize(getSavedTracksKey(user.country)));
      })
      .then(() => {
        enqueueSnackbar(
          {
            body: "Track removed to Saved tracks",
            type: "INFO",
          },
          {
            replaceDuplication: true,
            id: "savings",
          }
        );
      })
      .catch(() => {
        enqueueSnackbar(
          { body: "Something went wrong", type: "ALERT" },
          { replaceDuplication: true, id: "error" }
        );

        let indexes: number[] = [];
        let k = 0;

        mutate(
          (key: any) => {
            if (typeof key === "object" && "type" in key && "key" in key) {
              let index = key.key.split(" ").indexOf(id);

              if (key.type === "savings" && index !== -1) {
                indexes.push(index);
                return true;
              }
            }

            return false;
          },
          (data: any) => {
            const newArray = [...data];
            newArray[indexes[k]] = true;
            k++;
            return newArray;
          },
          {
            revalidate: false,
          }
        );
      });
  }

  function addToPlaylist(playlistId: string, uri: string) {
    mutate(
      unstable_serialize(getPlaylistKey(playlistId, user.country)),
      mutateFetcher(base_api_url + `/playlists/${playlistId}/tracks`, "POST", {
        uris: [uri],
      }),
      {
        populateCache: false,
        revalidate: true,
      }
    )
      .then(() => {
        enqueueSnackbar({ body: "Track added to playlist", type: "INFO" });
      })
      .catch(() => {
        enqueueSnackbar(
          { body: "Something went wrong", type: "ALERT" },
          { replaceDuplication: true, id: "error" }
        );
      });
  }

  function removeFromPlaylist(playlistId: string, uri: string) {
    mutate(
      unstable_serialize(getPlaylistKey(playlistId, user.country)),
      mutateFetcher(
        base_api_url + `/playlists/${playlistId}/tracks`,
        "DELETE",
        {
          tracks: [
            {
              uri,
            },
          ],
        }
      ),
      {
        populateCache: false,
        revalidate: true,
      }
    )
      .then(() => {
        enqueueSnackbar({ body: "Track removed to playlist", type: "INFO" });
      })
      .catch(() => {
        enqueueSnackbar(
          { body: "Something went wrong", type: "ALERT" },
          { replaceDuplication: true, id: "error" }
        );
      });
  }

  return {
    save,
    unSave,
    addToPlaylist,
    removeFromPlaylist,
  };
}

export default useTrackMutators;
