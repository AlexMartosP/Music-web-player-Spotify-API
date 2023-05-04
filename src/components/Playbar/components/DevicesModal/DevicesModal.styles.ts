import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  bottom: calc(100% + 0.5rem);
  right: 0;
  background-color: rgba(33, 33, 33, 0.7);
  padding: 0.625rem 0.375rem;
  border-radius: 0.625rem;
  width: 12.5rem;
  min-height: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.25rem;
    font-weight: var(--fs-bold);
    white-space: nowrap;
    color: var(--clr-white);
  }

  .pad {
    padding: 1rem 0.625rem;
  }
`;

export const CurrentWrapper = styled.div`
  padding-inline: 0.625rem;
  color: var(--clr-white);

  p {
    font-size: 1.25rem;
    font-weight: var(--fs-bold);
    white-space: nowrap;
    color: var(--clr-white);
  }
`;

export const Item = styled.button`
  padding: 1rem 0.625rem;
  border-radius: 0.625rem;
  margin-block-start: 0.625rem;
  color: var(--clr-white);
  width: 100%;
  text-align: start;

  &:hover {
    background-color: var(--clr-dark-gray);
  }
`;
