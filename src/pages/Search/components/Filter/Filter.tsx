import { useLocation } from "react-router-dom";
import { Chip, Wrapper } from "./Filter.styles";

interface FilterProps {
  data: any;
  query: string;
}

function Filter({ data, query }: FilterProps) {
  const location = useLocation();

  return (
    <Wrapper>
      <Chip to={{ pathname: "/search", search: `q=${query}` }} end>
        All
      </Chip>
      {(data.tracks.total > 0 || location.pathname.includes("tracks")) && (
        <Chip to={{ pathname: "tracks", search: `q=${query}` }}>Tracks</Chip>
      )}
      {(data.playlists.total > 0 ||
        location.pathname.includes("playlists")) && (
        <Chip to={{ pathname: "playlists", search: `q=${query}` }}>
          Playlists
        </Chip>
      )}
      {(data.albums.total > 0 || location.pathname.includes("albums")) && (
        <Chip to={{ pathname: "albums", search: `q=${query}` }}>Albums</Chip>
      )}
      {(data.artists.total > 0 || location.pathname.includes("artists")) && (
        <Chip to={{ pathname: "artists", search: `q=${query}` }}>Artists</Chip>
      )}
    </Wrapper>
  );
}

export default Filter;
