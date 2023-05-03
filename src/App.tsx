import { Route, Routes } from "react-router";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Container from "./pages/Container";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store";
import Protected from "./pages/Protected";
import { SWRConfig } from "swr";
import { fetcher, onErrorRetry } from "./services/fetcher";
import { selectLoading } from "./slices/auth";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useSelector } from "react-redux";
import Playlist from "./pages/Playlist";
import Genre from "./pages/Genre/Genre";
import Artist from "./pages/Artist";
import Albums from "./pages/Artist/pages/Albums";
import RelatedArtists from "./pages/Artist/pages/RelatedArtists/RelatedArtists";
import Album from "./pages/Album";
import Library from "./pages/Library";
import SavedTracks from "./pages/SavedTracks";
import Search from "./pages/Search";
import Tracks from "./pages/Search/subpages/Tracks";
import Playlists from "./pages/Search/subpages/Playlists";
import SearchAlbums from "./pages/Search/subpages/Albums";
import Artists from "./pages/Search/subpages/Artists";
import Queue from "./pages/Queue";
import BrowseRooms from "./pages/BrowseRooms";
import InRoom from "./pages/InRoom";
import RemoteHandlersProvider from "./context/RemoteHandlers";
import PlayerProvider from "./context/Player/PlayerProvider";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  const { load } = useAuth();
  const isLoading = useSelector(selectLoading);
  const location = useLocation();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const main = document.getElementById("main");
    if (main) {
      main.scrollTo({ top: 0 });
    }
  }, [location]);

  if (isLoading) return null;

  return (
    <Routes>
      <Route element={<Protected mode="loggedInOnly" key="main" />}>
        <Route path="/" element={<Container />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />}>
            <Route path="tracks" element={<Tracks />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="albums" element={<SearchAlbums />} />
            <Route path="artists" element={<Artists />} />
          </Route>
          <Route path="library" element={<Library />} />
          <Route path="saved-tracks" element={<SavedTracks />} />
          <Route path="queue" element={<Queue />} />
          <Route path="artist/:id" element={<Artist />} />
          <Route
            path="artist/:id/albums"
            element={
              <Albums
                titleCb={(artist) => `Albums by ${artist.name}`}
                filter={["album"]}
              />
            }
          />
          <Route
            path="artist/:id/featuring"
            element={
              <Albums
                titleCb={(artist) => `Featuring ${artist.name}`}
                filter={["appears_on"]}
              />
            }
          />
          <Route path="artist/:id/related" element={<RelatedArtists />} />
          <Route path="playlist/:id" element={<Playlist />} />
          <Route path="album/:id" element={<Album />} />
          <Route path="genre/:id" element={<Genre />} />
          <Route path="browse-rooms" element={<BrowseRooms />} />
          <Route path="in-room/:id" element={<InRoom />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route element={<Protected mode="loggedOutOnly" key="login" />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Provider store={store}>
        <SWRConfig
          value={{
            fetcher: fetcher,
            onErrorRetry: onErrorRetry,
            revalidateOnFocus: false,
          }}
        >
          <AppRoutes />
        </SWRConfig>
      </Provider>
    </Router>
  );
}

export default App;
