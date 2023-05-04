import styled from "styled-components";
import BREAKPOINTS from "../../constants/breakpoints";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--clr-white);
  height: 100%;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    flex-direction: row;
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 5rem 1.875rem 2rem 1.875rem;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    width: 50%;
  }

  @media (min-width: ${BREAKPOINTS.md_laptop}px) {
    width: 30%;
  }
`;

export const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1rem;
  background-color: var(--clr-light-gray);
  border-radius: 1.5rem;

  > svg {
    flex-shrink: 0;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .text-red {
    font-weight: var(--fs-semi-bold);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-block-start: 2rem;
  text-align: center;
  font-weight: var(--fs-semi-bold);

  button {
    background-color: #1ed760;
    border: none;
    color: var(--clr-white);
    border-radius: 0.625rem;
    padding: 1.25rem 5rem;

    &:disabled {
      background-color: rgba(30, 215, 96, 0.5);
    }
  }
`;

export const BlobWrapper = styled.div`
  display: none;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    display: block;
    width: 50%;
  }

  @media (min-width: ${BREAKPOINTS.md_laptop}px) {
    width: 70%;
  }

  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    border-radius: 3rem 0 0 3rem;
  }
`;
