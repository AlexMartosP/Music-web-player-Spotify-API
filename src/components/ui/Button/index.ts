import styled, { css } from "styled-components";

const variantStyles = {
  filled: css`
    background-color: var(--clr-black);
    color: var(--clr-white);
    border: 3px solid var(--clr-black);
  `,
  outline: css`
    background-color: var(--clr-white);
    color: var(--clr-black);
    border: 3px solid var(--clr-black);
  `,
};

const sizeStyles = {
  sm: css`
    padding: 0.5rem 1rem;
  `,
  md: css`
    padding: 0.875rem 1.5rem;
  `,
  lg: css`
    padding: 0.875rem 2.5rem;
  `,
};

const Button = styled.button<{
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outline";
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  background-color: var(--clr-black);
  color: var(--clr-white);
  border: none;
  border-radius: 50vh;
  text-decoration: none;
  font-weight: var(--fs-semi-bold);
  justify-content: center;

  ${({ size }) => size === "sm" && sizeStyles["sm"]}
  ${({ size }) => (!size || size === "md") && sizeStyles["md"]}
  ${({ size }) => size === "lg" && sizeStyles["lg"]}

  ${({ variant }) =>
    !variant || variant === "filled" ? variantStyles["filled"] : ""}
  ${({ variant }) => (variant === "outline" ? variantStyles["outline"] : "")}

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    transform: scale(1.02);
  }
  &:focus-visible {
    transform: scale(1.02);
    outline-offset: 1px;
    outline: 1px solid var(--clr-black);
  }

  &:active {
    transform: scale(1);
  }
`;

export default Button;
