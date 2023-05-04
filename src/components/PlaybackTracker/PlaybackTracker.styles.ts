import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const Time = styled.span`
  width: 35px;
  font-size: 0.75rem;
  color: var(--clr-light-gray);

  &[data-disabled="true"] {
    opacity: 0.5;
  }
`;
