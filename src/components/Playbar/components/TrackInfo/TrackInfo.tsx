// Components
import { SkeletonImage, SkeletonText } from "../../../ui/Skeletons";
// Assets
import defaultImgae from "../../../../assets/default_playlist.jpg";
// Styles
import { Artists, ImageWrapper, Title, Wrapper } from "./TrackInfo.styles";

interface TrackInfoProps {
  images: Spotify.Image[];
  name: string;
  artists: Spotify.Entity[];
  isLoading: boolean;
}

function TrackInfo({ images, name, artists, isLoading }: TrackInfoProps) {
  return (
    <Wrapper>
      {!isLoading ? (
        <>
          <ImageWrapper>
            <img
              src={images.length > 0 ? images[0].url : defaultImgae}
              alt=""
            />
          </ImageWrapper>
          <div>
            <Title className="clip-text">{name}</Title>
            <Artists className="clip-text">
              {artists.map((artist) => artist.name).join(", ")}
            </Artists>
          </div>
        </>
      ) : (
        <>
          <SkeletonImage className="no-shrink" maxWidth="2.5rem" />
          <div>
            <SkeletonText width="6rem" height="0.75rem" />
            <SkeletonText width="4rem" height="0.5rem" className="flow-xxxs" />
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default TrackInfo;
