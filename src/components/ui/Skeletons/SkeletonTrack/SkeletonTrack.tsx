import {
  Flow,
  Image,
  MetaWrapper,
  Rectangle,
  SmallRectangle,
  Wrapper,
} from "./SkeletonTrack.styles";

interface SkeletonTrackProps {
  className?: string;
}

function SkeletonTrack({ className }: SkeletonTrackProps) {
  return (
    <Wrapper className={className}>
      <MetaWrapper>
        <Image />
        <Flow>
          <Rectangle></Rectangle>
          <SmallRectangle></SmallRectangle>
        </Flow>
      </MetaWrapper>
      <SmallRectangle></SmallRectangle>
    </Wrapper>
  );
}

export default SkeletonTrack;
