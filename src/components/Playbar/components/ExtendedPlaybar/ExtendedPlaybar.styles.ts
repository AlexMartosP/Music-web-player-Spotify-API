import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)<{ hasImage: boolean }>`
  position: fixed;
  inset: 0;
  color: var(--clr-white);
  background-color: var(--clr-white);
  ${(props) =>
    !props.hasImage &&
    `
      background-color: rgba(33, 33, 33, 0.8);
      backdrop-filter: blur(50px);
  `}
  isolation: isolate;
  z-index: 10;

  svg {
    color: var(--clr-white);
  }

  a {
    color: var(--clr-white);
    text-decoration: none;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 2.5rem;
  max-width: min(30rem, 100% - 2rem);
  height: 100%;
  margin-inline: auto;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ImageWrapper = styled(motion.div)`
  margin-block-start: 3.75rem;

  .inner {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;

    &::-webkit-scrollbar {
      display: none;
    }

    .image-con {
      flex-shrink: 0;
      width: 100%;
      scroll-snap-align: start;
    }
  }

  img {
    max-width: clamp(12rem, 25vh, 51rem);
    aspect-ratio: 1;
    object-fit: cover;
    margin-inline: auto;
    user-select: none;
    width: 100%;
  }
`;

export const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-start: 2.5rem;
  margin-block-end: 1.25rem;
  gap: 1rem;

  h4 {
    font-weight: var(--fs-bold);
    font-size: 1.25rem;
  }

  span {
    font-size: 0.875rem;
    color: var(--clr-light-gray);
  }

  .filled {
    fill: var(--clr-white);
  }
`;

export const Playback = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-start: 1.25rem;

  > div {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-start: auto;

  > div {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(80px) brightness(0.8);
  transform: scale(1.3) translate3d(0, 0, 0);
  z-index: -1;
`;

export const MoreMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  color: var(--clr-white);
  text-decoration: none;
`;
