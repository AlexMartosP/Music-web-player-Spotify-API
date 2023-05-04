import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
  position: sticky;
  top: -1rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--clr-light-gray);
  margin: -1rem -1rem 0 -1rem;
  margin-bottom: 1rem;
  z-index: 10;
  overflow: hidden;

  span {
    font-size: 0.75rem;
    font-weight: var(--fs-semi-bold);
    color: var(--clr-red);
  }
`;
