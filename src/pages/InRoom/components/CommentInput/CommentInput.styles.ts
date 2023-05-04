import styled from "styled-components";
import BREAKPOINTS from "../../../../constants/breakpoints";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 1.25rem;
  align-items: center;
  background: rgba(33, 33, 33, 0.8);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 30px;
  backdrop-filter: blur(6px);
  padding: 0.625rem 1rem;
  border-radius: 2rem;
  height: 100%;

  @media (min-width: ${BREAKPOINTS.md_laptop}px) {
    padding: 1.25rem 2.5rem;
  }

  .icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    stroke-width: 2px;
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  color: var(--clr-white);
  outline: none;
`;

export const SendButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: var(--clr-white);
  border: none;
  border-radius: 50vh;
  color: var(--clr-black);

  :hover {
    transform: scale(1.05);
  }
`;

export const EmojiesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.25rem;
  align-items: center;
  background: rgba(33, 33, 33, 0.8);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 30px;
  backdrop-filter: blur(6px);
  padding: 0.625rem;
  border-radius: 2rem;
  height: 100%;

  @media (min-width: ${BREAKPOINTS.md_laptop}px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    padding: 1rem;
  }

  img {
    @media (max-width: ${BREAKPOINTS.md_laptop}px) {
      max-width: 1.5rem;
    }
  }
`;
