import { Link } from "react-router-dom";
import styled from "styled-components";
import BREAKPOINTS from "../../../constants/breakpoints";

interface WrapperProps {
  $horizontal: boolean;
}

export const Wrapper = styled(Link)<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--clr-black);
  word-break: break-word;
  text-decoration: none;
  padding: clamp(0.3125rem, 0.5vw, 1rem);
  padding-block-end: ${(props) =>
    props.$horizontal
      ? "clamp(0.3125rem, 0.5vw, 1rem)"
      : "clamp(2.5rem, 2vw, 5.5rem)"};

  border-radius: 0.5rem;
  font-size: clamp(1rem, 1vw, 4rem);
  transition: background 0.2s;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    ${(props) =>
      props.$horizontal
        ? `
      flex-direction: row;
      align-items: center;
      padding-inline-end: clamp(2.5rem, 2vw, 5.5rem);

      h3 {
        font-size: clamp(1.25rem, 1vw, 4rem);
      }

      img {
        max-width: 12rem;
      }
      `
        : ""}
  }

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  &:hover {
    background-color: var(--clr-light-gray);
  }
`;

export const Title = styled.h3`
  font-weight: var(--fs-bold);
`;

export const SubTitle = styled.p`
  margin-block-start: 5px;
  color: var(--clr-gray);
`;
