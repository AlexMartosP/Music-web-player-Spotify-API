import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 1.5rem;
  z-index: 2;
`;

export const NavWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ArrowWrapper = styled.button`
  padding: 0.25rem;
  background-color: var(--clr-light-gray);
  border-radius: 50vh;

  .right {
    transform: translateX(1px);
  }

  .left {
    transform: translateX(-1px);
  }

  &:disabled {
    opacity: 0.5;
  }

  svg {
    color: var(--clr-black);
  }
`;

export const NoNetworkWrapper = styled.div``;

export const UserWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border-radius: 50vh;
  background-color: var(--clr-dark-gray);
  color: var(--clr-white);
  max-width: 12.5rem;

  .image {
    max-width: 1.5rem;
  }

  .name {
    font-size: 0.875rem;
  }
`;

export const LinkFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
