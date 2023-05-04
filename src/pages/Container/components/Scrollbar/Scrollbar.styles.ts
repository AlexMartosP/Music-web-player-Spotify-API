import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 1rem;
`;

export const Bar = styled.div<{ height: number; visible: boolean }>`
  position: absolute;
  width: 8px;
  background: #888;
  border-radius: 50vh;
  height: ${(props) => `${props.height}%`};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.4s;
`;
