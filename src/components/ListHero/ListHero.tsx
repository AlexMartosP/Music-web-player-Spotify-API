// Redux
import { useAppDispatch } from "../../store/hooks";
import { playShuffle, playTrack } from "../../slices/playbar";
// Components
import Heading from "../ui/Heading";
import Button from "../ui/Button";
// Assets
import defaultImage from "../../assets/default_playlist.jpg";
// Helpers
import hasHTMLTags from "../../helpers/hasHTMLTags";
// Icons
import { Play, Shuffle } from "react-feather";
// Styles
import {
  ButtonsWrapper,
  Dot,
  ImageWrapper,
  InfoWrapper,
  MetaWrapper,
  TopWrapper,
} from "./ListHero.styles";
// Types
import { ImagesType } from "../../types/images";

interface ListHeroProps {
  type: string;
  name: string;
  images: ImagesType[];
  description?: string;
  owners: string | string[];
  totalTracks: number;
  contextUri?: string;
  buttons?: {
    showPlay: boolean;
    showShuffle: boolean;
  };
}

function ListHero({
  type,
  name,
  images,
  description,
  owners,
  totalTracks,
  contextUri,
  buttons = {
    showPlay: false,
    showShuffle: false,
  },
}: ListHeroProps) {
  const dispatch = useAppDispatch();

  function handlePlay() {
    if (contextUri) {
      dispatch(playTrack(contextUri, undefined, 0));
    }
  }

  function handleShuffle() {
    if (contextUri) {
      dispatch(playShuffle(contextUri, totalTracks));
    }
  }

  return (
    <>
      <TopWrapper>
        <ImageWrapper>
          <img src={images.length > 0 ? images[0].url : defaultImage} alt="" />
        </ImageWrapper>
        <InfoWrapper>
          <span className="type">{type}</span>
          <Heading>{name}</Heading>
          <p className="desc">{hasHTMLTags(description) ? "" : description}</p>
          <MetaWrapper>
            <span>{Array.isArray(owners) ? owners.join(", ") : owners}</span>
            <Dot></Dot>
            <span>{totalTracks} tracks</span>
          </MetaWrapper>
        </InfoWrapper>
      </TopWrapper>
      {totalTracks > 0 && (buttons.showPlay || buttons.showShuffle) && (
        <ButtonsWrapper>
          {buttons.showPlay && (
            <Button size="lg" variant="filled" onClick={handlePlay}>
              Play <Play strokeWidth={2.5} />
            </Button>
          )}
          {buttons.showShuffle && (
            <Button size="lg" variant="outline" onClick={handleShuffle}>
              Shuffle <Shuffle strokeWidth={2.5} />
            </Button>
          )}
        </ButtonsWrapper>
      )}
    </>
  );
}

export default ListHero;
