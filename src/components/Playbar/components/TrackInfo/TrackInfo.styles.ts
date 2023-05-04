import styled from "styled-components";
import BREAKPOINTS from "../../../../constants/breakpoints";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 2.5rem;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    width: 3.75rem;
  }
`;

export const Title = styled.h4`
  font-weight: var(--fs-semi-bold);
  color: var(--clr-white);
`;

export const Artists = styled.span`
  font-size: 0.875rem;
  color: var(--clr-gray);
`;
