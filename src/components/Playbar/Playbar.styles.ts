import styled from "styled-components";
import BREAKPOINTS from "../../constants/breakpoints";
import { motion } from "framer-motion";

export const FixedWrapper = styled(motion.div)<{
  isListening?: boolean;
  isSmall?: boolean;
}>`
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 6.25rem;
  z-index: 8;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    left: 8.125rem;
    bottom: 3.125rem;
    ${(props) => props.isSmall && "right: auto;"}
  }

  ${(props) =>
    !props.isSmall &&
    `
    @media (min-width: ${BREAKPOINTS.md_laptop}px) {
      ${props.isListening && "width: 40%"};
      right: ${props.isListening ? "auto" : "3.125rem"};
    }
  `}
`;

export const StyledPlaybar = styled.div<{
  isRemote?: boolean;
}>`
  padding: 1rem;
  background: rgba(33, 33, 33, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: ${(props) =>
    props.isRemote ? "1.5rem 1.5rem 0 0" : "1.5rem"};

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    padding: 1.25rem 2.5rem;
    border-radius: ${(props) => (props.isRemote ? "2rem 2rem 0 0" : "2rem")};
  }
`;

export const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.875rem;

  .buttons-flex {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .filled {
      fill: var(--clr-white);
    }
  }
`;

export const ButtonsFlex = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  svg {
    color: var(--clr-white);
    width: 1.25rem;
    height: 1.25rem;
  }

  .filled {
    fill: var(--clr-white);
  }
`;

export const ManipWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 50vh;
  background-color: var(--clr-white);
  font-weight: var(--fs-semi-bold);
  border: none;
  flex-shrink: 0;

  svg {
    flex-shrink: 0;
    color: var(--clr-black) !important;
  }

  &:hover:not(:disabled) {
    transform: scale(1.03);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const RemoteWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0 0 1.5rem 1.5rem;
  color: var(--clr-white);
  font-size: 0.75rem;
  overflow: hidden;
  isolation: isolate;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    padding: 1rem 2.5rem;
    font-size: 0.875rem;
    border-radius: 0 0 2rem 2rem;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 5px;

    @media (min-width: ${BREAKPOINTS.mobile}px) {
      gap: 1rem;
    }
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
    stroke-width: 3px;

    @media (min-width: ${BREAKPOINTS.mobile}px) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  img {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .sync {
    color: var(--clr-white);
    text-decoration: underline;
  }

  .leave {
    color: var(--clr-red);
    font-weight: var(--fs-semi-bold);
    text-decoration: underline;
  }
`;
