import styled from "styled-components";
import { StyledPlaybar } from "../../Playbar.styles";
import BREAKPOINTS from "../../../../constants/breakpoints";

export const Wrapper = styled(StyledPlaybar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  color: var(--clr-white);
`;

export const Left = styled.div<{ isShowing?: boolean }>`
  display: ${(props) => (props.isShowing ? "block" : "none")};

  h3 {
    font-weight: var(--fs-bold);

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      font-size: 0.875rem;
    }
  }

  p {
    margin-block-start: 0.625rem;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      font-size: 0.75rem;
    }
  }
`;

export const Right = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1rem;

  .minimize {
    color: var(--clr-white);
  }

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    svg {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
`;
