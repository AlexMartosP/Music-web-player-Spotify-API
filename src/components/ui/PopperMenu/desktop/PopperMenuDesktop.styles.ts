import styled from "styled-components";

export const Modal = styled.div<{ fullWidth?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  left: auto;
  bottom: auto;
  padding-block: 0.25rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background-color: var(--clr-white);
  white-space: nowrap;
  max-width: 12.5rem;
  z-index: 9;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  > *:not(.divider) {
    padding: 1rem;
    padding-inline-start: 1rem;
    padding-inline-end: 1.875rem;
    margin-inline: 0.25rem;
    border-radius: 5px;
    color: var(--clr-black);
    text-decoration: none;

    &:hover {
      background-color: var(--clr-light-gray);
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: var(--clr-light-gray);
  }
`;
