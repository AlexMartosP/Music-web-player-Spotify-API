import styled from "styled-components";
import { Skeleton } from "../skeleton";

const SkeletonH2 = styled(Skeleton)`
  width: clamp(8rem, 1.5vw, 16rem);
  height: clamp(2rem, 1.5vw, 4rem);
  border-radius: 0.5rem;
  margin-block-end: 1rem;
`;

export default SkeletonH2;
