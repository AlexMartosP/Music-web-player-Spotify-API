import styled from "styled-components";
import BREAKPOINTS from "../../constants/breakpoints";

export const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: var(--fs-extra-bold);
`;

export const Flex = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-block-start: 1.25rem;
  flex-direction: column;

  > div {
    flex: 1;
  }

  @media (min-width: ${BREAKPOINTS.laptop}px) {
    flex-direction: row;
  }
`;

interface GridProps {
  sm?: number;
  md?: number;
  lg?: number;
  fixedCols?: number;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 1rem;

  ${(props) =>
    props.fixedCols
      ? `
        grid-template-columns: repeat(${props.fixedCols}, 1fr);
      `
      : ""};
`;

export const Flow = styled.div`
  margin-block-start: 2.5rem;
`;
