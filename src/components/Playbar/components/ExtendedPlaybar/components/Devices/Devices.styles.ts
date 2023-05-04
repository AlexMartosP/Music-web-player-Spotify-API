import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--clr-dark-gray);
  padding: 2.125rem;
  z-index: 10;

  svg {
    color: var(--clr-white);
  }
`;

export const Content = styled.div`
  margin-block-start: 2.5rem;
`;

export const NoDevices = styled.div`
  color: var(--clr-white);
  padding-inline: 0.625rem;
`;

export const LoadingWrapper = styled.div`
  display: flex;
`;

export const VolumeWrapper = styled.div`
  margin-block-start: auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  svg {
    flex-shrink: 0;
  }
`;
