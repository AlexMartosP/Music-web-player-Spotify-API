import {
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import Snackbar from "./components/Snackbar";
import { createPortal } from "react-dom";
import { SnackbarContainer } from "./styles/SnackbarContainer";
import { HandlersContext, OriginType, StateType } from "./types";
import { SnackbarHandlersContext } from "./context";
import { useAppSelector } from "../../store/hooks";
import { selectIsActive } from "../../slices/playbar";
import { selectIsRemote } from "../../slices/remote";
import { useLocation } from "react-router-dom";

interface SnackbarProviderProps extends PropsWithChildren {
  maxMessages?: number;
  autoHideTime?: number;
  domNode?: HTMLElement;
  origin?: OriginType;
}

let enqueueSnackbarOut: HandlersContext["enqueueSnackbar"];
let closeSnackbarOut: HandlersContext["closeSnackbar"];

function SnackbarProvider({
  maxMessages = 3,
  autoHideTime = 5000,
  domNode,
  origin = { horizontal: "right", vertical: "top" },
  children,
}: SnackbarProviderProps) {
  const [appMessages, setAppMessages] = useState<StateType>({
    messages: [],
    queue: [],
  });
  const isActive = useAppSelector(selectIsActive);
  const isRemote = useAppSelector(selectIsRemote);
  const location = useLocation();

  const enqueueSnackbar = useCallback<HandlersContext["enqueueSnackbar"]>(
    (message, options?) => {
      const { body, type, action } = message;
      const newMessage = {
        body,
        type,
        id: crypto.randomUUID(),
        shouldClose: false,
        open: true,
        action,
        entered: false,
        ...options,
      };

      setAppMessages((state) => {
        if (options?.preventDuplication) {
          const inView = state.messages.find(
            (snack) => snack.id === options?.id
          );
          const inQueue = state.queue.find((snack) => snack.id === options.id);

          if (inView?.open || inQueue?.open) {
            return state;
          }
        }

        if (options?.replaceDuplication) {
          const inView = state.messages.find(
            (snack) => snack.id === options?.id
          );
          const inQueue = state.queue.find((snack) => snack.id === options.id);

          if (inView?.open) {
            const snacks = state.messages.map((snack) => {
              if (snack.id === options.id) {
                return {
                  ...snack,
                  body: newMessage.body,
                  type: newMessage.type,
                };
              }

              return snack;
            });

            return { ...state, messages: snacks };
          }

          if (inQueue?.open) {
            const snacks = state.queue.map((snack) => {
              if (snack.id === options.id) {
                return {
                  ...snack,
                  body: newMessage.body,
                  type: newMessage.type,
                };
              }

              return snack;
            });

            return { ...state, queue: snacks };
          }
        }

        if (state.messages.length < maxMessages) {
          return { ...state, messages: [...state.messages, newMessage] };
        } else {
          return closeOldest({
            messages: state.messages,
            queue: [...state.queue, newMessage],
          });
        }
      });

      return newMessage.id;
    },
    []
  );

  const handleEntered = (id: string) => {
    setAppMessages((state) => {
      const snacks = state.messages.map((snack) => {
        if (snack.id === id) {
          return { ...snack, entered: true };
        }

        return { ...snack };
      });

      return { ...state, messages: snacks };
    });
  };

  const closeOldest = (state: StateType) => {
    const messages = state.messages.map((msg, index) => {
      // Should not set if this was last in queue
      if (index === 0 && state.queue.length > 0) {
        return { ...msg, shouldClose: true };
      }
      return msg;
    });

    return { ...state, messages };
  };

  const closeSnackbar = useCallback<HandlersContext["closeSnackbar"]>((id) => {
    setAppMessages((state) => {
      const messages = state.messages.map((msg) => {
        if (msg.id === id) {
          return { ...msg, open: false };
        }

        return msg;
      });

      return { messages, queue: state.queue.filter((msg) => msg.id !== id) };
    });
  }, []);

  const handleExit = (id: string) => {
    setAppMessages((state) => {
      const messages = state.messages.filter((msg) => msg.id !== id);

      // If only one in queue do not close oldest or send in other params
      // This is what causing the bug eather fic here or in cloeoldest or different solution
      if (state.queue.length > 0) {
        return closeOldest({
          messages: [...messages, state.queue[0]],
          queue: state.queue.slice(1),
        });
      } else {
        return { ...state, messages };
      }
    });
  };

  useEffect(() => {
    enqueueSnackbarOut = enqueueSnackbar;
    closeSnackbarOut = closeSnackbar;
  }, []);

  const isInRoom = location.pathname.includes("/in-room");

  const messages = (
    <SnackbarContainer
      origin={origin}
      smBottom={
        isInRoom ? "22.69rem" : isActive && isRemote ? "14.25rem" : "11.25rem"
      }
    >
      {appMessages.messages.map((message) => (
        <Snackbar
          key={message.id}
          message={message}
          closeSnackbar={closeSnackbar}
          handleExit={handleExit}
          handleEntered={handleEntered}
          autoHideTime={autoHideTime}
          origin={origin}
        />
      ))}
    </SnackbarContainer>
  );

  const value = useMemo(() => {
    return {
      enqueueSnackbar,
      closeSnackbar,
    };
  }, []);

  return (
    <SnackbarHandlersContext.Provider value={value}>
      {children}
      {domNode ? createPortal(messages, domNode) : messages}
    </SnackbarHandlersContext.Provider>
  );
}

export function useSnackbars() {
  return useContext(SnackbarHandlersContext) as HandlersContext;
}

export {
  enqueueSnackbarOut as enqueueMessage,
  closeSnackbarOut as closeMessage,
};
export default SnackbarProvider;
