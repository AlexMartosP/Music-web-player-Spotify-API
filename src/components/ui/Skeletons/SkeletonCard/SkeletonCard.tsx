import { Image, SubTitle, Title, Wrapper } from "./SkeletonCard.styles";

interface SkeletonCardProps {
  horizontal?: boolean;
}

function SkeletonCard({ horizontal }: SkeletonCardProps) {
  return (
    <Wrapper $horizontal={horizontal}>
      <Image></Image>
      <div>
        <Title></Title>
        <SubTitle></SubTitle>
      </div>
    </Wrapper>
  );
}

export default SkeletonCard;
