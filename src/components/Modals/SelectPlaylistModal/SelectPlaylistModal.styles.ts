import styled from "styled-components";
import BREAKPOINTS from "../../../constants/breakpoints";

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: var(--clr-black);
  }

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    gap: 1rem;
  }
`;

export const InputWrapper = styled(Flex)`
  flex: 1;
  padding: 0.75rem;
  background-color: var(--clr-light-gray);
  border-radius: 0.625rem;
  color: var(--clr-gray);

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    padding: 1rem;
  }

  button {
    background-color: transparent;
    border: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
`;

export const SinglePlaylist = styled.button`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  text-align: start;
  padding: 5px;
  border-radius: 0.5rem;
  color: var(--clr-black);

  h4 {
    font-size: 0.875rem;
    @media (min-width: ${BREAKPOINTS.mobile}px) {
      font-size: 1rem;
    }
  }

  img {
    width: 3.75rem;
    aspect-ratio: 1;
  }

  &:hover {
    background-color: var(--clr-light-gray);
  }
`;

export const Meta = styled(Flex)`
  font-size: 0.75rem;
  color: var(--clr-gray);

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    font-size: 0.875rem;
  }

  .dot {
    width: 4px;
    height: 4px;
    background-color: var(--clr-gray);
    border-radius: 50vh;
  }

  .tracks {
    white-space: nowrap;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-block-end: 0.625rem;
`;
