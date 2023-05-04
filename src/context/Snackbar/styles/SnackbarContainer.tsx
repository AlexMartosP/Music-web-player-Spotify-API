import styled from "styled-components";
import { OriginType } from "../types";

export const SnackbarContainer = styled.div<{
  origin: OriginType;
  smBottom: string;
}>`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  z-index: 2;
  top: auto;
  bottom: ${(props) => props.smBottom};
  left: 2rem;
  right: 2rem;

  @media (min-width: 767px) {
    ${({ origin: { horizontal } }) =>
      horizontal === "center" && "transform: translate(-50%);"};
    flex-direction: ${({ origin: { vertical } }) =>
      vertical === "bottom" ? "column-reverse" : "column"};
    top: ${({ origin: { vertical } }) =>
      vertical === "top" ? "2rem" : "auto"};
    bottom: ${({ origin: { vertical } }) =>
      vertical === "bottom" ? "2rem" : "auto"};
    left: ${({ origin: { horizontal } }) =>
      horizontal === "left"
        ? "2rem"
        : horizontal === "center"
        ? "50%"
        : "auto"};
    right: ${({ origin: { horizontal } }) =>
      horizontal === "right" ? "2rem" : "auto"};
  }
`;
