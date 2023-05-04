import { motion } from "framer-motion";
import styled from "styled-components";

export const MobileModal = styled(motion.div)`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(42, 42, 42, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: var(--clr-white);
  z-index: 10;

  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
  }

  .top {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-block-start: 5rem;
    text-align: center;

    img {
      width: 10rem;
      height: 10rem;
      margin-inline: auto;
    }

    h4 {
      font-size: 1.25rem;
      font-weight: var(--fs-semi-bold);
    }
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-inline: 2.5rem;
    margin-block-start: 3.75rem;

    a {
      color: var(--clr-white);
      text-decoration: none;
    }
  }

  .close {
    position: sticky;
    position: -webkit-sticky;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block-start: auto;
    padding-block-start: 1.25rem;
    padding-block-end: 2.5rem;
    background: linear-gradient(
      180deg,
      rgba(42, 42, 42, 0) 0%,
      rgba(42, 42, 42, 0.4) 25%,
      rgba(42, 42, 42, 0.65) 50%,
      rgba(42, 42, 42, 0.85) 75%,
      rgb(42, 42, 42) 100%
    );

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.75rem;
      height: 3.75rem;
      background-color: var(--clr-white);
      border: none;
      border-radius: 50vh;
      color: var(--clr-black);
    }
  }

  .divider {
    display: none;
  }
`;
