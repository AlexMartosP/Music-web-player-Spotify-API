import styled, { keyframes } from "styled-components";
// Breakpoints
import BREAKPOINTS from "../../../../constants/breakpoints";

const commentAnimationSideToSide = keyframes`
 from { 
  right: -10%;   
}

 to { 
  right: 110%;
  }
`;

const commentAnimationBottomToTop = keyframes`
 from { 
  bottom: -10%;   
}

 to { 
  bottom: 110%;
  display: none;
  }
`;

export const Wrapper = styled.div<{ pos: number }>`
  position: absolute;
  display: flex;
  top: ${(props) => props.pos + "%"};
  left: auto;
  animation-name: ${commentAnimationSideToSide};
  animation-duration: 8s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  overflow: hidden;

  @media (min-width: ${BREAKPOINTS.md_laptop}px) {
    top: auto;
    left: ${(props) => props.pos + "%"};
    animation-name: ${commentAnimationBottomToTop};
  }

  img {
    flex-shrink: 0;
    width: 3rem;
  }
`;

export const CommentString = styled.p`
  padding: 0.75rem 1.25rem;
  background: rgba(33, 33, 33, 0.8);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 30px;
  backdrop-filter: blur(6px);
  border-radius: 10px 10px 10px 0px;
`;
