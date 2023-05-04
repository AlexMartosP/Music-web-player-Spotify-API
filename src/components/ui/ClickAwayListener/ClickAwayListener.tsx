import {
  forwardRef,
  useRef,
  useEffect,
  PropsWithChildren,
  MutableRefObject,
  MouseEvent,
} from "react";

interface ClickAwayListenerProps extends PropsWithChildren {
  handleClose: () => void;
  preventCloseInside?: boolean;
  preventEscape?: boolean;
  preventScroll?: boolean;
}

const ClickAwayListener = forwardRef<HTMLElement, ClickAwayListenerProps>(
  (
    {
      handleClose,
      preventCloseInside = false,
      preventEscape = false,
      preventScroll = true,
      children,
    },
    ref
  ) => {
    const nodeToExclude = (ref as MutableRefObject<HTMLElement>)?.current;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
          handleClose();
        }
      }

      function handleClick(e: Event) {
        if (nodeToExclude) {
          if (
            e.target !== containerRef.current &&
            !nodeToExclude.contains(e.target as Element)
          ) {
            handleClose();
          }
          return;
        }

        if (e.target !== containerRef.current) {
          handleClose();
          return;
        }
      }

      if (!preventEscape) {
        window.addEventListener("keydown", handleKeyDown);
      }
      window.addEventListener("click", handleClick);

      if (preventScroll) {
        document.body.classList.toggle("prevent-scroll");
      }

      return () => {
        if (!preventEscape) {
          window.removeEventListener("keydown", handleKeyDown);
        }
        window.removeEventListener("click", handleClick);
        if (preventScroll) {
          document.body.classList.toggle("prevent-scroll");
        }
      };
    }, []);

    function handlePreventClick(e: MouseEvent) {
      e.stopPropagation();
    }

    return (
      <div
        ref={containerRef}
        onClick={preventCloseInside ? handlePreventClick : undefined}
      >
        {children}
      </div>
    );
  }
);

export default ClickAwayListener;
