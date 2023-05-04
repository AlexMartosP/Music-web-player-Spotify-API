import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { Unsubscribe } from "firebase/firestore";
// Config
import { firebaseConfig } from "../config/firebase";
// Redux
import { togglePlay } from "../slices/playbar";
import {
  leaveRoom,
  leaveRoomAsModerator,
  selectRemote,
  sendCommentToRoom,
  subscribeToRoom,
  subscribeToRoomAsModerator,
  syncListener,
} from "../slices/remote";
import { useAppDispatch, useAppSelector } from "../store/hooks";
// Snackbar
import { enqueueMessage } from "./Snackbar/SnackbarProvider";

export interface RemotehandlersContextType {
  leaveAsModerator: () => Promise<void>;
  join: (roomId: string) => Promise<void>;
  joinAsModerator: (roomId: string) => Promise<void>;
  sync: () => void;
  sendComment: (comment: string) => Promise<void>;
  leave: () => void;
}

const RemotehandlersContext = createContext<RemotehandlersContextType | null>(
  null
);

function RemoteHandlersProvider({ children }: PropsWithChildren) {
  const remote = useAppSelector(selectRemote);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    function handleHide() {
      fetch(
        `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/rooms/${remote.roomInfo.id}`,
        {
          method: "DELETE",
          keepalive: true,
        }
      );
    }

    if (remote.isModerator) {
      window.addEventListener("beforeunload", handleHide);
    }

    return () => {
      window.removeEventListener("beforeunload", handleHide);
    };
  }, [remote]);

  const join = useCallback(async (roomId: string) => {
    try {
      const unsub = await dispatch(subscribeToRoom(roomId, () => leave(true)));
      unsubscribeRef.current = unsub;
    } catch (error) {
      throw error;
    }
  }, []);

  const joinAsModerator = useCallback(async (roomId: string) => {
    try {
      const unsub = await dispatch(subscribeToRoomAsModerator(roomId));
      unsubscribeRef.current = unsub;
    } catch (error) {
      throw error;
    }
  }, []);

  const sync = useCallback(() => {
    dispatch(syncListener());
  }, []);

  const leave = useCallback((forcedEnd?: boolean) => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    if (remote.isModerator) {
      leaveAsModerator();
      return;
    }
    dispatch(leaveRoom(forcedEnd));

    dispatch(togglePlay(true));
    navigate("/browse-rooms", { replace: true });

    if (forcedEnd) {
      enqueueMessage({ body: "Room ended", type: "INFO" });
    }
  }, []);

  const leaveAsModerator = useCallback(async () => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    await dispatch(leaveRoomAsModerator());
    navigate("/browse-rooms", { replace: true });
  }, [remote.roomInfo.id]);

  const sendComment = useCallback(async (comment: string) => {
    try {
      dispatch(sendCommentToRoom(comment));
    } catch (error) {}
  }, []);

  const value = useMemo(() => {
    return {
      leaveAsModerator,
      join,
      joinAsModerator,
      sync,
      sendComment,
      leave,
    };
  }, [leaveAsModerator, join, joinAsModerator, sync, sendComment, leave]);

  return (
    <RemotehandlersContext.Provider value={value}>
      {children}
    </RemotehandlersContext.Provider>
  );
}

export function useRemoteHandlers() {
  return useContext(RemotehandlersContext) as RemotehandlersContextType;
}

export default RemoteHandlersProvider;
