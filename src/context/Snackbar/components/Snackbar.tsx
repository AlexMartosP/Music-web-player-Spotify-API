import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useEffect, useRef, useState, useCallback } from "react";
import { AlertOctagon, AlertTriangle, Info } from "react-feather";
import { SnackbarItem } from "../styles/Snackbar";
import { HandlersContext, OriginType, SnackbarType } from "../types";

interface SingleAppMessageProps {
  message: SnackbarType;
  closeSnackbar: HandlersContext["closeSnackbar"];
  handleExit: (id: string) => void;
  handleEntered: (id: string) => void;
  autoHideTime: number;
  origin: OriginType;
}

function Snackbar({
  message,
  closeSnackbar,
  handleExit,
  autoHideTime,
  handleEntered,
  origin,
}: SingleAppMessageProps) {
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = useCallback(() => {
    timerId.current = setTimeout(() => {
      closeSnackbar(message.id);
    }, autoHideTime);
  }, [autoHideTime]);

  const stopTimer = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  }, []);

  const resumeTimer = useCallback(() => {
    timerId.current = setTimeout(() => {
      closeSnackbar(message.id);
    }, autoHideTime * 0.5);
  }, []);

  useEffect(() => {
    startTimer();

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [message.body]);

  useEffect(() => {
    if (message.shouldClose && message.entered) {
      stopTimer();
      setTimeout(() => {
        closeSnackbar(message.id);
      }, 100);
    }
  }, [message.shouldClose, message.entered]);

  useEffect(() => {
    window.addEventListener("blur", stopTimer);
    window.addEventListener("focus", resumeTimer);

    return () => {
      window.removeEventListener("blur", stopTimer);
      window.removeEventListener("focus", resumeTimer);
    };
  }, []);

  function handleActionClick() {
    if (message.action?.callback) {
      message.action?.callback();
      if (message.closeOnAction) {
        closeSnackbar(message.id);
      }
    }
  }

  let icon: ReactElement;
  switch (message.type) {
    case "WARNING":
      icon = <AlertTriangle color="#FFC200" />;
      break;
    case "ALERT":
      icon = <AlertOctagon color="#FF2626" />;
      break;
    case "INFO":
      icon = <Info color="#1e7ed4" />;
      break;
    default:
      icon = <Info color="#1e7ed4" />;
  }

  // Separate component that callc children(), after getbounding, forwardref
  //
  return (
    <AnimatePresence onExitComplete={() => handleExit(message.id)}>
      {message.open && (
        <motion.div
          exit={{
            height: 0,
            overflow: "hidden",
            transition: { delay: 0.3, duration: 0.1 },
          }}
        >
          <SnackbarItem
            initial={{ left: "calc(100% + 2rem)" }}
            animate={{ left: 0, transition: { duration: 0.1 } }}
            exit={{ left: "calc(100% + 2rem)", transition: { duration: 0.1 } }}
            transition={{ type: "tween" }}
            onAnimationComplete={() => handleEntered(message.id)}
          >
            <div className="meta">
              {icon}
              <span>{message.body}</span>
            </div>
            {message.action && (
              <button onClick={handleActionClick} className="action">
                {message.action.label}
              </button>
            )}
          </SnackbarItem>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Snackbar;
