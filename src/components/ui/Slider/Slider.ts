import styled from "styled-components";
import BREAKPOINTS from "../../../constants/breakpoints";

const Slider = styled.div`
  display: flex;
  overflow-x: auto;
  margin-inline-end: -2.5rem;
  gap: 1rem;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    margin-inline: -1rem;

    > *:first-child {
      margin-inline-start: 1rem;
    }
  }

  > * {
    flex-shrink: 0;
    max-width: clamp(9rem, 18vw, 26rem);
  }

  > *:last-child {
    margin-inline-end: 2.5rem;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      margin-inline-end: 1rem;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Slider;
