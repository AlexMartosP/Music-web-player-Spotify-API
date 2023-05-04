import { motion } from "framer-motion";
import styled from "styled-components";

export const SnackbarItem = styled(motion.div)`
  position: relative;
  display: flex;
  gap: 0.625rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1rem;
  border-radius: 0.625rem;
  background-color: #e9e9e9;
  width: 18.75rem;
  margin-block-end: 1rem;
  width: 100%;

  @media (min-width: 767px) {
    padding: 1.875rem 1rem;
    width: 22rem;
  }

  .meta {
    display: flex;
    gap: 0.625rem;
    align-items: center;

    span {
      font-weight: 600;
    }

    svg {
      width: 1.125rem;
      height: 1.125rem;
      stroke-width: 2.5px;

      @media (min-width: 767px) {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  .action {
    background-color: transparent;
    border: none;
    text-decoration: underline;
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
  }
`;
