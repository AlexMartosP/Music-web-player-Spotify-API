import { Outlet, useMatch } from "react-router-dom";
// Styles
import { Main, Wrapper } from "./Container.styles";
import Navigation from "../../components/Navigation";
import Playbar from "../../components/Playbar";
import SnackbarProvider from "../../context/Snackbar/SnackbarProvider";
import RemoteHandlersProvider from "../../context/RemoteHandlers";
import PlayerProvider from "../../context/Player/PlayerProvider";
import TopNavigation from "../../components/TopNavigation";
import GlobalModal from "../../components/Modals/GlobalModal";
import { Suspense } from "react";

function Container() {
  const match = useMatch("/in-room/:id");

  return (
    <Wrapper>
      <Navigation />
      <PlayerProvider>
        <RemoteHandlersProvider>
          <SnackbarProvider maxMessages={1}>
            <Main id="main" noEndPadding={!!match}>
              {!match && <TopNavigation />}
              <Suspense fallback="">
                <div className="flex-1">
                  <Outlet />
                </div>
              </Suspense>
            </Main>
            {!match && <Playbar />}
            <GlobalModal />
          </SnackbarProvider>
        </RemoteHandlersProvider>
      </PlayerProvider>
    </Wrapper>
  );
}

export default Container;
