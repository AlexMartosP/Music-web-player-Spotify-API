import styled from "styled-components";
import BREAKPOINTS from "../../constants/breakpoints";

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    flex-direction: row;
    align-items: center;
    gap: 2.5rem;
  }
`;

export const InfoWrapper = styled.div`
  flex: 1;
  .type {
    display: none;
    font-weight: var(--fs-semi-bold);
    color: #909a8f;

    @media (min-width: ${BREAKPOINTS.mobile}px) {
      display: block;
    }
  }

  .name {
    font-size: clamp(1.5rem, 4.5vw, 4rem);
    font-weight: var(--fs-extra-bold);
  }

  .desc {
    color: #909a8f;
    margin-block-start: 0.5rem;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  img {
    max-width: clamp(12.5rem, 35vw, 18.75rem);
    aspect-ratio: 1;
    object-fit: cover;
  }
`;

export const MetaWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  color: #909a8f;
  margin-block-start: 1rem;
  font-weight: var(--fs-semi-bold);
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  background: #909a8f;
  border-radius: 50vh;
`;

export const ButtonsWrapper = styled.div`
  margin-block-start: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
