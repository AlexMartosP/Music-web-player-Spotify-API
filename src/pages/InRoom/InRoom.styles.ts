import styled from "styled-components";
import BREAKPOINTS from "../../constants/breakpoints";

export const Wrapper = styled.div`
  height: 100%;
  .top {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  @media (min-width: ${BREAKPOINTS.md_laptop}px) {
    .top {
      flex-direction: row;

      > div {
        flex: 1;
      }
    }
  }

  .content {
    position: relative;
    color: var(--clr-white);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    z-index: 2;
  }

  > img {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 1;
  }
`;

export const MetaWrapper = styled.div`
  @media (max-width: ${BREAKPOINTS.md_laptop}px) {
    display: flex;
    justify-content: space-between;
  }

  .meta {
    display: grid;

    @media (min-width: ${BREAKPOINTS.md_laptop}px) {
      column-gap: 1.25rem;
      align-items: center;
      grid-auto-rows: min-content;
      grid-auto-columns: max-content;
    }
  }

  .name {
    /* grid-area: 1 / 1 / 2 / 5; */
    grid-row: 1;

    @media (min-width: ${BREAKPOINTS.md_laptop}px) {
      grid-area: 1 / 1 / 2 / 3;
    }
  }

  .count {
    /* grid-area: 3 / 1 / 4 / 5; */
    grid-row: 3;
    margin-block-start: 1rem;

    @media (min-width: ${BREAKPOINTS.md_laptop}px) {
      grid-area: 1 / 3 / 2 / 5;
      margin-block-start: 0;
    }
  }

  .moderator {
    display: block;
    grid-row: 2;
    margin-block-start: 5px;
    color: var(--clr-light-gray);

    @media (min-width: ${BREAKPOINTS.md_laptop}px) {
      grid-area: 2 / 1 / 3 / 5;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-direction: column;

  @media (min-width: ${BREAKPOINTS.md_laptop}px) {
    margin-block-start: 1.25rem;
    flex-direction: row;
  }

  button {
    background-color: rgba(15, 15, 15, 0.4);
    border: none;
    color: var(--clr-white);
    padding: 0.625rem;
    border-radius: 50vh;

    svg {
      width: 1rem;
      height: 1rem;
      stroke-width: 2.5px;
    }
  }
`;

export const TrackWrapper = styled.div`
  margin-block-start: 3rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  img {
    width: 200px;
  }

  .track-name {
    margin-block-start: 0.625rem;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
  }

  .artists {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
  }

  a {
    display: block;
    margin-block-start: 0.625rem;
    color: var(--clr-white);
  }
`;

export const BottomWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  flex-direction: column-reverse;

  @media (min-width: ${BREAKPOINTS.md_laptop}px) {
    flex-direction: row;
  }

  > div {
    flex: 1;
  }
`;

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  @media (min-width: ${BREAKPOINTS.md_laptop}px) {
    flex-direction: row;
  }
`;

export const PausedNoteWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  gap: 1rem;
  background-color: var(--clr-light-gray);
  padding: 1rem;
  border-radius: 10px;
  margin-block-end: 1rem;
  color: var(--clr-black);

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #1e7ed4;
    stroke-width: 2.5px;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 100%;

  .loader {
    width: 48px;
    height: 48px;
    display: inline-block;
    position: relative;
  }
  .loader::after {
    content: "";
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--clr-black);
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    animation: animloader 2s ease-in-out infinite;
  }

  @keyframes animloader {
    0%,
    100% {
      transform: scale(0);
      opacity: 1;
    }
    50% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
