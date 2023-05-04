import styled from "styled-components";
import { StyledPlaybar } from "../../Playbar.styles";

export const Wrapper = styled(StyledPlaybar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
`;

export const Right = styled.div`
  flex-shrink: 0;
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

export const RemoteButtonsFlex = styled.div`
  display: flex;
  gap: 1rem;
`;
