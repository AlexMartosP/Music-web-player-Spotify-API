import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
// Redux
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import { selectLoading } from "./slices/auth";
// SWR
import { SWRConfig } from "swr";
// Hooks
import useAuth from "./hooks/useAuth";
// Services
import { fetcher, onErrorRetry } from "./services/fetcher";
// Pages
import Container from "./pages/Container";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Protected from "./pages/Protected";
// Lazy pages
const Album = lazy(() => import("./pages/Album"));
const Artist = lazy(() => import("./pages/Artist"));
const Albums = lazy(() => import("./pages/Artist/pages/Albums"));
const RelatedArtists = lazy(
  () => import("./pages/Artist/pages/RelatedArtists")
);
const BrowseRooms = lazy(() => import("./pages/BrowseRooms"));
const Genre = lazy(() => import("./pages/Genre/Genre"));
const Home = lazy(() => import("./pages/Home"));
const InRoom = lazy(() => import("./pages/InRoom"));
const Library = lazy(() => import("./pages/Library"));
const Playlist = lazy(() => import("./pages/Playlist"));
const Queue = lazy(() => import("./pages/Queue"));
const SavedTracks = lazy(() => import("./pages/SavedTracks"));
const Search = lazy(() => import("./pages/Search"));
const SearchAlbums = lazy(() => import("./pages/Search/subpages/Albums"));
const Artists = lazy(() => import("./pages/Search/subpages/Artists"));
const Playlists = lazy(() => import("./pages/Search/subpages/Playlists"));
const Tracks = lazy(() => import("./pages/Search/subpages/Tracks"));

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
