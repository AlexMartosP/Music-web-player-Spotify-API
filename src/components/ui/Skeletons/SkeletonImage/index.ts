import styled from "styled-components";
import { Skeleton } from "../skeleton";

const SkeletonImage = styled(Skeleton)<{ maxWidth?: string }>`
  width: 100%;
  max-width: ${(props) => props.maxWidth || "100%"};
  aspect-ratio: 1;
  border-radius: 0.5rem;
`;

export default SkeletonImage;
