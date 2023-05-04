import styled from "styled-components";
import { Skeleton } from "../skeleton";

const SkeletonText = styled(Skeleton)<{ width?: string; height?: string }>`
  width: ${(props) => props.width || "50%"};
  height: ${(props) => props.height || "1.25rem"};
  border-radius: 5px;
`;

export default SkeletonText;
