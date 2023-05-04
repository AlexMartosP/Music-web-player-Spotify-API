import styled from "styled-components";
import { Skeleton } from "../skeleton";

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
`;

export const Flow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Image = styled(Skeleton)`
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
`;

export const Rectangle = styled(Skeleton)`
  max-width: 6rem;
  height: 0.9rem;
  border-radius: 3px;
  width: 6rem;
`;

export const SmallRectangle = styled(Skeleton)`
  max-width: 4rem;
  height: 0.75rem;
  border-radius: 3px;
  width: 4rem;
`;
