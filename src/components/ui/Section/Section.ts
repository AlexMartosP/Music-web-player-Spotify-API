import styled from "styled-components";

export const Section = styled.div`
  margin-block-start: 2.5rem;

  .title-wrapper {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-block-end: 1.25rem;

    a {
      font-weight: var(--fs-semi-bold);
      color: var(--clr-gray);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
