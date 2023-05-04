import styled from "styled-components";
import BREAKPOINTS from "../../constants/breakpoints";

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column-reverse;

  @media (min-width: 48rem) {
    flex-direction: row;
  }
`;

export const Main = styled.div<{ noEndPadding?: boolean }>`
  position: relative;
  padding: 1rem;
  flex: 2;
  background-color: var(--clr-white);
  border-radius: 0 0 1.5rem 1.5rem;
  overflow-y: scroll;
  ${(props) => !props.noEndPadding && "padding-block-end: 8rem;"}
  display: flex;
  flex-direction: column;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    padding: 3.75rem 2.5rem;
    ${(props) => !props.noEndPadding && "padding-block-end: 12rem;"}
    border-radius: 3rem 0 0 3rem;
  }
`;
