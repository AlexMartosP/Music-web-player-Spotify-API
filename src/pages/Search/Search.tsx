import { ChangeEvent, useState } from "react";
import { Search as SearchIcon } from "react-feather";
import { useNavigate, useOutlet, useSearchParams } from "react-router-dom";
import useTimeout from "../../hooks/useTimeout";
import { SearchWrapper } from "./Search.styles";
import NoSearch from "./components/NoSearch";
import SearchResult from "./components/SearchResults/SearchResults";
import withNetwork from "../../HOC/withNetwork";

function Search() {
  const [query, setQuery] = useSearchParams("");
  const [defferedQuery, setDefferedQuery] = useState(query.get("q") || "");
  const outlet = useOutlet();
  const navigate = useNavigate();

  useTimeout(
    () => setDefferedQuery(query.get("q") || ""),
    [query.get("q")],
    200
  );

  function handleInput(e: ChangeEvent) {
    const { value } = e.target as HTMLInputElement;

    if (!value) {
      setQuery({});
      navigate("/search");
      return;
    }

    setQuery({ q: value });
  }

  return (
    <>
      <div>
        <SearchWrapper>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search..."
            value={query.get("q") || ""}
            onChange={handleInput}
          />
        </SearchWrapper>
      </div>
      {defferedQuery ? <SearchResult query={defferedQuery} /> : <NoSearch />}
    </>
  );
}

export default withNetwork(Search);
