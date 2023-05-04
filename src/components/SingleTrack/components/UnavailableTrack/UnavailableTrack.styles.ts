import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  gap: 0.5rem;
  height: 74px;
`;

export const MetaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .number {
    width: 1rem;
  }

  .image {
    width: 4rem;
    height: 4rem;
    background-color: var(--clr-gray);
  }
`;

export const Flow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Rectangle = styled.div`
  max-width: 6rem;
  height: 0.9rem;
  background-color: var(--clr-gray);
  border-radius: 3px;
  width: 6rem;
`;

export const SmallRectangle = styled.div`
  max-width: 4rem;
  height: 0.75rem;
  background-color: var(--clr-gray);
  border-radius: 3px;
  width: 4rem;
`;
