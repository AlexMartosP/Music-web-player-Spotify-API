// Components
import { SkeletonH1, SkeletonImage, SkeletonText } from "../../ui/Skeletons";
// Styles
import { InfoWrapper, TopWrapper } from "../ListHero.styles";

function SkeletonListHero() {
  return (
    <TopWrapper>
      <SkeletonImage
        className="center-self"
        maxWidth="clamp(12.5rem, 35vw, 18.75rem)"
      />
      <InfoWrapper>
        <SkeletonText className="type" width="5rem" />
        <SkeletonH1 className="flow-xxs" />
        <SkeletonText className="flow-xxs" />
        <SkeletonText className="flow-xxs" width="12rem" />
      </InfoWrapper>
    </TopWrapper>
  );
}

export default SkeletonListHero;
