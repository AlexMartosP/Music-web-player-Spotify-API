import styled from "styled-components";
import BREAKPOINTS from "../../constants/breakpoints";

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem;
  background-color: var(--clr-white);
  box-shadow: 0px 0px 30px -6px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    padding: 1.875rem;
    border-radius: 1.5rem;
  }

  svg {
    color: var(--clr-gray);
  }

  input {
    width: 100%;
    border: none;
    outline: none;

    &::placeholder {
      color: var(--clr-gray);
    }
  }
`;
