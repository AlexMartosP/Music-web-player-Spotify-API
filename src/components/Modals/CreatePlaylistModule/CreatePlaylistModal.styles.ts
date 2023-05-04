import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

export const TopWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const TextAreaWrapper = styled.div`
  flex: 2;
  padding: 0.75rem;
  background-color: var(--clr-light-gray);
  border-radius: 0.625rem;
  color: var(--clr-gray);

  textarea {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
  }
`;

export const ErrorText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  background-color: var(--clr-red);
  color: var(--clr-white);
  border-radius: 0.625rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
