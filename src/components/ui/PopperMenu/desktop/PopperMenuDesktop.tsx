import {
  forwardRef,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
  MutableRefObject,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import ClickAwayListener from "../../../ui/ClickAwayListener";
import { Modal } from "./PopperMenuDesktop.styles";

interface PopperMenuDesktopProps extends PropsWithChildren {
  close: () => void;
  fullWidth?: boolean;
  onClickInside?: (e: MouseEvent) => void;
}

const PopperMenuDesktop = forwardRef<HTMLElement, PopperMenuDesktopProps>(
  ({ close, children, fullWidth, onClickInside }, btnRef) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const btnNode = (btnRef as MutableRefObject<HTMLElement>).current;

    // Calculate position
    useLayoutEffect(() => {
      if (menuRef.current && btnNode) {
        const rectBtn = btnNode.getBoundingClientRect();
        const rectMenu = menuRef.current.getBoundingClientRect();

        // Default to bottom
        const availableHeight = window.innerHeight - rectBtn.bottom;

        const x = -(window.innerWidth - rectBtn.right) + 16;
        const y =
          availableHeight < rectMenu.height
            ? rectBtn.top - rectMenu.height - 8
            : rectBtn.bottom + 8;

        menuRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    }, []);

    return createPortal(
      <ClickAwayListener handleClose={close} ref={btnRef}>
        <Modal
          id="modal"
          aria-labelledby="btn"
          ref={menuRef}
          role="menu"
          tabIndex={-1}
          onClick={onClickInside}
          fullWidth={fullWidth}
        >
          {children}
        </Modal>
      </ClickAwayListener>,
      document.getElementById("portal")!
    );
  }
);

export default PopperMenuDesktop;
