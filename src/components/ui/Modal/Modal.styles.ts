import styled from "styled-components";
import BREAKPOINTS from "../../../constants/breakpoints";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(40, 40, 40, 0.3);
  z-index: 10;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 1rem);
  height: 60%;
  background-color: var(--clr-white);
  border-radius: 1.5rem;
  padding: 1rem;
  overflow: auto;
  z-index: 11;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 50vh;
  }

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    width: 80%;
  }

  @media (min-width: ${BREAKPOINTS.laptop}px) {
    width: 40%;
  }
`;
