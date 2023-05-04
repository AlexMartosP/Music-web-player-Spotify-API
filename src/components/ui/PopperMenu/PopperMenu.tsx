import {
  createContext,
  forwardRef,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from "react";
import BREAKPOINTS from "../../../constants/breakpoints";
import useWindowSize from "../../../hooks/useWindowSize";
import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import PopperMenuDesktop from "./desktop";
import PopperMenuMobile from "./mobile";
import {
  ExpandedMobileModal,
  ExpandedModal,
  ListItem,
} from "./PopperMenu.styles";

const Start = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <div className="divider"></div>
    </>
  );
};

interface ItemProps extends PropsWithChildren {
  customElement?: boolean;
  onClick?: (e: MouseEvent) => void;
  preventClose?: boolean;
}

const Item = ({ onClick, preventClose = false, children }: ItemProps) => {
  const { width } = useWindowSize();
  const mobileOnly = useContext(MobileOnlyContext);

  function handleClick(e: MouseEvent) {
    if (preventClose) {
      e.stopPropagation();
    }

    if (onClick) {
      onClick(e);
    }
  }

  return (
    <ListItem
      onClick={handleClick}
      role="menuitem"
      tabIndex={0}
      hoverable={width > BREAKPOINTS.mobile && !mobileOnly}
    >
      {children}
    </ListItem>
  );
};

interface ExpandableProps extends PropsWithChildren {
  label: string | ReactElement;
  mobileHeading: string;
}

const Expandable = ({ label, mobileHeading, children }: ExpandableProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { width } = useWindowSize();
  const mobileOnly = useContext(MobileOnlyContext);

  if (width > BREAKPOINTS.mobile && !mobileOnly) {
    return (
      <ListItem
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        hoverable={true}
      >
        <span>{label}</span>
        {isHovering && <ExpandedModal>{children}</ExpandedModal>}
      </ListItem>
    );
  }

  function toggleMobile(e: MouseEvent) {
    e.stopPropagation();
    setIsHovering((prev) => !prev);
  }

  return (
    <>
      <ListItem onClick={toggleMobile} hoverable={false}>
        {label}
      </ListItem>
      {createPortal(
        isHovering && (
          <ExpandedMobileModal>
            <div>
              <h4>{mobileHeading}</h4>
              <div className="items-list">{children}</div>
              <div className="close">
                <button className="reset-button" onClick={toggleMobile}>
                  Close
                </button>
              </div>
            </div>
          </ExpandedMobileModal>
        ),
        document.getElementById("portal")!
      )}
    </>
  );
};

const End = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="divider"></div>
      {children}
    </>
  );
};

interface PopperMenuProp extends PropsWithChildren {
  isOpen: boolean;
  image?: string;
  title?: string;
  mobileOnly?: boolean;
  fullWidth?: boolean;
  handleClose: () => void;
  onClickInside?: (e: MouseEvent) => void;
}

const MobileOnlyContext = createContext(false);
const PopperMenu = Object.assign(
  forwardRef<HTMLElement, PopperMenuProp>(
    (
      {
        isOpen,
        image,
        title,
        mobileOnly = false,
        handleClose,
        fullWidth,
        children,
        onClickInside,
      },
      ref
    ) => {
      const { width } = useWindowSize();

      if (width > BREAKPOINTS.mobile && !mobileOnly) {
        return (
          <>
            {isOpen && (
              <MobileOnlyContext.Provider value={mobileOnly}>
                <PopperMenuDesktop
                  ref={ref}
                  close={handleClose}
                  fullWidth={fullWidth}
                  onClickInside={onClickInside}
                >
                  {children}
                </PopperMenuDesktop>
              </MobileOnlyContext.Provider>
            )}
          </>
        );
      }

      return (
        <AnimatePresence>
          {isOpen && (
            <MobileOnlyContext.Provider value={mobileOnly}>
              <PopperMenuMobile
                image={image}
                title={title}
                close={handleClose}
                onClickInside={onClickInside}
              >
                {children}
              </PopperMenuMobile>
            </MobileOnlyContext.Provider>
          )}
        </AnimatePresence>
      );
    }
  ),
  {
    Start,
    Item,
    Expandable,
    End,
  }
);

export default PopperMenu;
