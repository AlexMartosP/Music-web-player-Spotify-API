import styled from "styled-components";

export const InfoWrapper = styled.div`
  span {
    font-weight: var(--fs-semi-bold);
    color: var(--clr-gray);
  }

  h1 {
    font-size: clamp(1.5rem, 9vw, 4rem);
    font-weight: var(--fs-extra-bold);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(clamp(10rem, 12vw, 44rem), 1fr)
  );
  gap: 1rem;
  margin-block-start: clamp(2.5rem, 9vw, 3.75rem);
`;
