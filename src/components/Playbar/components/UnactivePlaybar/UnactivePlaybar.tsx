import { useRef, useState } from "react";
import { Left, Right, Wrapper } from "./UnactivePlaybar.styles";
import useWindowSize from "../../../../hooks/useWindowSize";
import BREAKPOINTS from "../../../../constants/breakpoints";
import { ChevronLeft, ChevronRight, Speaker } from "react-feather";
import ClickAwayListener from "../../../ui/ClickAwayListener";
import DevicesModule from "../DevicesModal";
import { ActionButton } from "../../Playbar.styles";

interface SmallState {
  minimized: boolean;
  devicesOpen: boolean;
}

function UnactivePlaybar() {
  const [smallState, setSmallState] = useState<SmallState>({
    minimized: false,
    devicesOpen: false,
  });
  const { width } = useWindowSize();
  const devicesBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <Wrapper>
      <Left isShowing={!smallState.minimized}>
        <h3>This player is not currently active</h3>
        <p>You can still control your active device from here</p>
      </Left>
      <Right>
        <div className="relative">
          <ActionButton
            onClick={() =>
              setSmallState((prev) => ({
                ...prev,
                devicesOpen: !prev.devicesOpen,
              }))
            }
            ref={devicesBtnRef}
          >
            <Speaker />
            {width > BREAKPOINTS.mobile && (
              <span
                style={{
                  display: !smallState.minimized ? "block" : "none",
                }}
              >
                Change
              </span>
            )}
          </ActionButton>
          {smallState.devicesOpen && (
            <ClickAwayListener
              ref={devicesBtnRef}
              handleClose={() =>
                setSmallState((prev) => ({
                  ...prev,
                  devicesOpen: false,
                }))
              }
              preventCloseInside
              preventScroll={false}
            >
              <DevicesModule />
            </ClickAwayListener>
          )}
        </div>
        {width > BREAKPOINTS.mobile && (
          <button
            className="reset-button minimize"
            onClick={() =>
              setSmallState((prev) => ({
                ...prev,
                minimized: !prev.minimized,
              }))
            }
          >
            {!smallState.minimized ? <ChevronLeft /> : <ChevronRight />}
          </button>
        )}
      </Right>
    </Wrapper>
  );
}

export default UnactivePlaybar;
