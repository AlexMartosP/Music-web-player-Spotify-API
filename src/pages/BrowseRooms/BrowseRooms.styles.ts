import styled from "styled-components";
import BREAKPOINTS from "../../constants/breakpoints";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    gap: clamp(4rem, 15vw, 20rem);
    flex-direction: row;
    align-items: center;
  }
`;

export const InfoWrapper = styled.div`
  flex: 1;

  p {
    color: var(--clr-dark-gray);
  }
`;

export const MetaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;

  .label {
    color: var(--clr-red);
    font-weight: var(--fs-semi-bold);
    text-transform: uppercase;
  }
`;

export const CountWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 3px 7px;
  background-color: var(--clr-light-gray);
  border-radius: 50vh;
  color: var(--clr-gray);
  font-size: 0.875rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    display: block;

    button,
    a {
      margin-block-start: 1.25rem;
    }
  }
`;
