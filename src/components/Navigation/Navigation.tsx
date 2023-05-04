// Icons
import { Disc, Folder, Heart, Home as House, Search } from "react-feather";
import { selectRemote } from "../../slices/remote";
import { useAppSelector } from "../../store/hooks";
import { Divider, NavItem, Wrapper } from "./Navigation.styles";

function Navigation() {
  const remote = useAppSelector(selectRemote);

  return (
    <Wrapper>
      <nav>
        <NavItem to="/">
          <House />
          <span>Home</span>
        </NavItem>
        <NavItem to="/search">
          <Search />
          <span>Search</span>
        </NavItem>
        <NavItem to="/library">
          <Folder />
          <span>Your library</span>
        </NavItem>
        <NavItem to="/saved-tracks" className="sm-hide">
          <Heart />
        </NavItem>
        <Divider className="sm-hide"></Divider>
        <NavItem
          to={
            !remote.isRemote
              ? "/browse-rooms"
              : `/in-room/${remote.roomInfo.id}`
          }
        >
          <Disc />
          <span>Remote party</span>
        </NavItem>
      </nav>
    </Wrapper>
  );
}

export default Navigation;
