import styled from "styled-components";

export const ExpandedModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  padding-block: 0.25rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background-color: var(--clr-white);
  white-space: nowrap;
  max-width: 12.5rem;
  min-width: 10rem;
  z-index: 9;

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

export const ListItem = styled.li<{ hoverable: boolean }>`
  position: relative;

  ${(props) =>
    props.hoverable &&
    `
  &:hover,
  &:focus {
    background-color: var(--clr-light-gray);
  }
  
  `}
`;

export const ExpandedMobileModal = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(42, 42, 42, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: var(--clr-white);
  overflow-y: auto;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  h4 {
    padding-inline: 2.5rem;
    font-size: 1.25rem;
    font-weight: var(--fs-semi-bold);
  }

  .items-list {
    padding-inline: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-block-start: 1.5rem;

    a {
      color: var(--clr-white);
    }
  }

  .close {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block-start: auto;
    padding-block-start: 3.75rem;
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
      color: var(---clr-white);
    }
  }

  .divider {
    display: none;
  }
`;
