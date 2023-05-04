import styled from "styled-components";
import { StyledPlaybar } from "../../../../Playbar.styles";

export const Wrapper = styled(StyledPlaybar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.875rem;

  svg {
    color: var(--clr-white);
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const Middle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--clr-white);
  }
`;
