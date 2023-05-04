import styled from "styled-components";
import { Skeleton } from "../skeleton";

const SkeletonH1 = styled(Skeleton)<{ width?: string }>`
  width: ${(props) => props.width || "70%"};
  height: clamp(4rem, 1.5vw, 8rem);
  border-radius: 0.5rem;
  margin-block-end: 1rem;
`;

export default SkeletonH1;
