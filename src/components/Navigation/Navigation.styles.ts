import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem;

  nav {
    display: flex;
    justify-content: space-between;
  }

  .sm-hide {
    display: none;
  }

  @media (min-width: 48rem) {
    display: flex;
    flex-direction: column;
    padding-inline: clamp(1.25rem, 1.5vw, 5.25rem);

    nav {
      flex: 2;
      justify-content: center;
      flex-direction: column;
      gap: clamp(2.5rem, 1.5vw, 7.5rem);
    }

    .sm-hide {
      display: flex;
    }

    svg {
      width: clamp(1.5rem, 1.5vw, 5rem);
      height: clamp(1.5rem, 1.5vw, 5rem);
    }
  }
`;

export const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: var(--clr-gray);
  text-decoration: none;
  font-size: 0.75rem;

  &.active {
    color: #212121;
  }

  @media (min-width: 48rem) {
    padding-inline: 0.75rem;

    span {
      display: none;
    }
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--clr-gray);
`;

export const LastItem = styled.button`
  margin-block-start: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  color: var(--clr-white);
  background-color: var(--clr-black);
  border-radius: 50vh;
`;
