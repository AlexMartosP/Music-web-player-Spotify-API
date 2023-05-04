import styled from "styled-components";

export const Wrapper = styled.div<{ disabled: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: none;
  background-color: transparent;
  border-radius: 0.5rem;
  transition: background 0.2s;
  z-index: 1;
  gap: 0.5rem;
  height: 74px;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};

  > *:first-child {
    flex-grow: 3;
    flex-shrink: 0;
  }

  > * {
    flex: 1;
  }

  &:hover {
    background-color: var(--clr-light-gray);
  }

  &:hover:not(:disabled) {
    .number {
      display: none;
    }

    svg {
      display: block;
    }
  }
`;

export const MetaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .number {
    flex-shrink: 0;
    display: block;
    width: 1rem;
  }

  svg {
    flex-shrink: 0;
    display: none;
    width: 1rem;
    height: 1rem;
  }

  img {
    width: 4rem;
    height: 4rem;
  }

  .title {
    font-size: 1.125rem;
    font-weight: var(--fs-semi-bold);
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;

    &.playing {
      color: #2e77d0;
    }
  }

  .artists {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  button {
    background-color: transparent;
    border: none;

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--clr-black);
    }

    .saved {
      fill: var(--clr-black);
    }
  }
`;
