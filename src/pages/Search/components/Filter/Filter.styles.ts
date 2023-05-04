import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-block-start: 1rem;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Chip = styled(NavLink)`
  font-weight: var(--fs-medium);
  background-color: var(--clr-light-gray);
  color: var(--clr-black);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 50vh;
  font-size: clamp(0.75rem, 2vw, 1rem);

  &.active {
    background-color: var(--clr-black);
    color: var(--clr-white);
  }
`;
