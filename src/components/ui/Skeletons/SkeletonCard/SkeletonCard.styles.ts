import styled from "styled-components";
import { Skeleton } from "../skeleton";
import BREAKPOINTS from "../../../../constants/breakpoints";

export const Wrapper = styled.div<{ $horizontal: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: clamp(0.3125rem, 0.5vw, 1rem);
  padding-block-end: ${(props) =>
    props.$horizontal
      ? "clamp(0.3125rem, 0.5vw, 1rem)"
      : "clamp(2.5rem, 2vw, 5.5rem)"};
  width: 100%;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    ${(props) =>
      props.$horizontal
        ? `
      flex-direction: row;
      align-items: center;
      padding-inline-end: clamp(2.5rem, 2vw, 5.5rem);

      > div {
        flex: 1;
      }
      `
        : ""}
  }
`;

export const Image = styled(Skeleton)`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 0.5rem;
`;

export const Title = styled(Skeleton)`
  width: 50%;
  height: 1.25rem;
  border-radius: 5px;
`;

export const SubTitle = styled(Skeleton)`
  margin-block-start: 0.75rem;
  width: 20%;
  height: 1rem;
  border-radius: 5px;
`;
