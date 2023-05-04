import styled from "styled-components";
import BREAKPOINTS from "../../constants/breakpoints";

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    gap: 2.5rem;
    align-items: center;
    flex-direction: row;
  }

  .image-wrapper {
    @media (max-width: ${BREAKPOINTS.mobile}px) {
      margin-inline: auto;
    }

    max-width: clamp(12.5rem, 12rem + 12.5vw, 20rem);
    aspect-ratio: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  h1 {
    font-size: clamp(4rem, 8vw, 8rem);
    font-weight: var(--fs-extra-bold);
  }

  span {
    color: var(--clr-gray);
    font-weight: var(--fs-semi-bold);
  }
`;

export const TracksWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const Section = styled.div`
  margin-block-start: 2.5rem;

  .title-wrapper {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-block-end: 1.25rem;

    h2 {
      font-size: 1.5rem;
      font-weight: var(--fs-bold);
    }

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
