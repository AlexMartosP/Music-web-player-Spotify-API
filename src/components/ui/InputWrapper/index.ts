import styled from "styled-components";
// Constants
import BREAKPOINTS from "../../../constants/breakpoints";

export const InputWrapper = styled.div<{ error?: boolean }>`
  flex: 1;
  padding: 0.75rem;
  background-color: var(--clr-light-gray);
  border-radius: 0.625rem;
  color: var(--clr-gray);
  border: ${(props) => (props.error ? "2px solid var(--clr-red)" : "")};

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    padding: 1rem;
  }

  input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;
