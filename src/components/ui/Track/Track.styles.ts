import styled from "styled-components";
import { motion } from "framer-motion";
import BREAKPOINTS from "../../../constants/breakpoints";

export const Wrapper = styled.div<{ vertical: boolean }>`
  position: relative;
  display: grid;
  align-items: center;
  max-width: 30rem;
  width: 100%;
  height: 2.5rem;
  cursor: pointer;

  ${(props) =>
    props.vertical &&
    `
    height: 100%;
    width: auto;
  `}

  .tracker {
    position: relative;
    height: 3px;
    border-radius: 50vh;
    background-color: var(--clr-gray);
    overflow: hidden;

    &.vertical {
      width: 3px;
      height: 100%;
    }

    &[data-disabled="true"] {
      opacity: 0.5;
    }
  }

  &::before {
    top: -20px;
    bottom: -20px;
    left: 0;
    right: 0;
  }

  .progress {
    position: absolute;
    left: 0;
    width: 100%;
    background-color: var(--clr-white);
    border-radius: 50vh;
    height: 100%;

    &.vertical {
      inset: auto 0 0 0;
    }
  }

  .thumb {
    position: absolute;
    top: 50%;
    width: 0.5rem;
    height: 0.5rem;
    background-color: var(--clr-white);
    border-radius: 50vh;
    user-select: none;
    -webkit-user-select: none;
    transform: translateY(-50%) translateX(-50%);
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &::before {
      content: "";
      position: absolute;
      inset: -20px;
    }

    &:hover:not([data-disabled="true"]) {
      box-shadow: 0px 0px 0px 8px rgb(255 255 255 / 16%);
    }

    &:active {
      width: 0.75rem;
      height: 0.75rem;
      box-shadow: 0px 0px 0px 6px rgb(255 255 255 / 16%);
    }

    &.vertical {
      top: auto;
      right: 50%;
      transform: translateX(50%);
    }

    &[data-disabled="true"] {
      opacity: 0.5;
    }
  }
`;
