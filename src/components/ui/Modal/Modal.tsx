import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import { Overlay, Wrapper } from "./Modal.styles";

export interface ModalProps extends PropsWithChildren {
  handleClose: () => void;
}

function Modal({ handleClose, children }: ModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  }, []);

  return createPortal(
    <>
      <Wrapper>{children}</Wrapper>
      <Overlay onClick={handleClose} />
    </>,
    document.getElementById("portal")!
  );
}

export default Modal;
