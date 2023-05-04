import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "react-feather";
import { Link } from "react-router-dom";
import BREAKPOINTS from "../../constants/breakpoints";
import useAuth from "../../hooks/useAuth";
import useNetwork from "../../hooks/useNetwork";
import useWindowSize from "../../hooks/useWindowSize";
import { selectCurrentUser } from "../../slices/auth";
import { useAppSelector } from "../../store/hooks";
import PopperMenu from "../ui/PopperMenu";
import {
  ArrowWrapper,
  LinkFlex,
  NavWrapper,
  UserWrapper,
  Wrapper,
} from "./TopNavigation.styles";
import OfflineDesktop from "./components/OfflineDesktop";
import OfflineMobile from "./components/OfflineMobile";
import useHistoryNavigation from "./hooks/useNavigation";

function TopNavigation() {
  const [isUserPopperOpen, setIsUserPopperOpen] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser)!;
  const isOnline = useNetwork({ listenToOffline: true });
  const { width } = useWindowSize();
  const { history, handleBack, handleForward } = useHistoryNavigation();
  const { logout } = useAuth();
  const userBtnRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <AnimatePresence>
        {width < BREAKPOINTS.mobile && !isOnline && <OfflineMobile />}
      </AnimatePresence>
      <Wrapper>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <NavWrapper>
            <ArrowWrapper
              className="reset-button"
              onClick={handleBack}
              disabled={!history.back}
            >
              <ChevronLeft className="left" />
            </ArrowWrapper>
            <ArrowWrapper
              className="reset-button"
              onClick={handleForward}
              disabled={!history.forward}
            >
              <ChevronRight className="right" />
            </ArrowWrapper>
          </NavWrapper>
          <AnimatePresence>
            {width >= BREAKPOINTS.mobile && !isOnline && <OfflineDesktop />}
          </AnimatePresence>
        </div>
        <div className="relative">
          <UserWrapper
            onClick={() => setIsUserPopperOpen((prev) => !prev)}
            ref={userBtnRef}
          >
            {currentUser.images.length > 0 && (
              <div className="image">
                <img src={currentUser.images[0].url} />
              </div>
            )}
            <span className="name clip-text">
              {currentUser.display_name || "Your account"}
            </span>
          </UserWrapper>
          <PopperMenu
            isOpen={isUserPopperOpen}
            handleClose={() => setIsUserPopperOpen(false)}
            ref={userBtnRef}
            fullWidth
          >
            <Link to={currentUser.externalUrl} target="_blank">
              <LinkFlex>
                Account
                <ExternalLink />
              </LinkFlex>
            </Link>
            <PopperMenu.End>
              <PopperMenu.Item onClick={logout}>Logout</PopperMenu.Item>
            </PopperMenu.End>
          </PopperMenu>
        </div>
      </Wrapper>
    </>
  );
}

export default TopNavigation;
