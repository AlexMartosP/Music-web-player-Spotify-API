import BREAKPOINTS from "../../../../constants/breakpoints";
import useWindowSize from "../../../../hooks/useWindowSize";
import Desktop from "./components/Desktop";
import Mobile from "./components/Mobile";

interface RegularPlaybarProps {
  openPlaylistModal: () => void;
}

function RegularPlaybar({ openPlaylistModal }: RegularPlaybarProps) {
  const { width } = useWindowSize();

  return (
    <>
      {width < BREAKPOINTS.md_laptop ? (
        <Mobile openPlaylistModal={openPlaylistModal} />
      ) : (
        <Desktop openPlaylistModal={openPlaylistModal} />
      )}
    </>
  );
}

export default RegularPlaybar;
