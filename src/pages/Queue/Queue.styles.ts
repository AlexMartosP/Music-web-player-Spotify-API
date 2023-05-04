import styled from "styled-components";

export const NotActiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;

  button {
    margin-block-start: 2rem;
    background-color: var(--clr-black);
    color: var(--clr-white);
    border-radius: 50vh;
    padding: 0.875rem 2.5rem;
  }

  span {
    margin-block-start: 0.5rem;
    font-size: 0.875rem;
  }
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const ValidatingSpinner = styled.span`
  font-size: 4px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: mulShdSpin 1.1s infinite ease;
  transform: translateZ(0);

  @keyframes mulShdSpin {
    0%,
    100% {
      box-shadow: 0em -2.6em 0em 0em #000, 1.8em -1.8em 0 0em rgba(0, 0, 0, 0.2),
        2.5em 0em 0 0em rgba(0, 0, 0, 0.2),
        1.75em 1.75em 0 0em rgba(0, 0, 0, 0.2),
        0em 2.5em 0 0em rgba(0, 0, 0, 0.2),
        -1.8em 1.8em 0 0em rgba(0, 0, 0, 0.2),
        -2.6em 0em 0 0em rgba(0, 0, 0, 0.5),
        -1.8em -1.8em 0 0em rgba(0, 0, 0, 0.7);
    }
    12.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(0, 0, 0, 0.7), 1.8em -1.8em 0 0em #000,
        2.5em 0em 0 0em rgba(0, 0, 0, 0.2),
        1.75em 1.75em 0 0em rgba(0, 0, 0, 0.2),
        0em 2.5em 0 0em rgba(0, 0, 0, 0.2),
        -1.8em 1.8em 0 0em rgba(0, 0, 0, 0.2),
        -2.6em 0em 0 0em rgba(0, 0, 0, 0.2),
        -1.8em -1.8em 0 0em rgba(0, 0, 0, 0.5);
    }
    25% {
      box-shadow: 0em -2.6em 0em 0em rgba(0, 0, 0, 0.5),
        1.8em -1.8em 0 0em rgba(0, 0, 0, 0.7), 2.5em 0em 0 0em #000,
        1.75em 1.75em 0 0em rgba(0, 0, 0, 0.2),
        0em 2.5em 0 0em rgba(0, 0, 0, 0.2),
        -1.8em 1.8em 0 0em rgba(0, 0, 0, 0.2),
        -2.6em 0em 0 0em rgba(0, 0, 0, 0.2),
        -1.8em -1.8em 0 0em rgba(0, 0, 0, 0.2);
    }
    37.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(0, 0, 0, 0.2),
        1.8em -1.8em 0 0em rgba(0, 0, 0, 0.5),
        2.5em 0em 0 0em rgba(0, 0, 0, 0.7), 1.75em 1.75em 0 0em #000,
        0em 2.5em 0 0em rgba(0, 0, 0, 0.2),
        -1.8em 1.8em 0 0em rgba(0, 0, 0, 0.2),
        -2.6em 0em 0 0em rgba(0, 0, 0, 0.2),
        -1.8em -1.8em 0 0em rgba(0, 0, 0, 0.2);
    }
    50% {
      box-shadow: 0em -2.6em 0em 0em rgba(0, 0, 0, 0.2),
        1.8em -1.8em 0 0em rgba(0, 0, 0, 0.2),
        2.5em 0em 0 0em rgba(0, 0, 0, 0.5),
        1.75em 1.75em 0 0em rgba(0, 0, 0, 0.7), 0em 2.5em 0 0em #000,
        -1.8em 1.8em 0 0em rgba(0, 0, 0, 0.2),
        -2.6em 0em 0 0em rgba(0, 0, 0, 0.2),
        -1.8em -1.8em 0 0em rgba(0, 0, 0, 0.2);
    }
    62.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(0, 0, 0, 0.2),
        1.8em -1.8em 0 0em rgba(0, 0, 0, 0.2),
        2.5em 0em 0 0em rgba(0, 0, 0, 0.2),
        1.75em 1.75em 0 0em rgba(0, 0, 0, 0.5),
        0em 2.5em 0 0em rgba(0, 0, 0, 0.7), -1.8em 1.8em 0 0em #000,
        -2.6em 0em 0 0em rgba(0, 0, 0, 0.2),
        -1.8em -1.8em 0 0em rgba(0, 0, 0, 0.2);
    }
    75% {
      box-shadow: 0em -2.6em 0em 0em rgba(0, 0, 0, 0.2),
        1.8em -1.8em 0 0em rgba(0, 0, 0, 0.2),
        2.5em 0em 0 0em rgba(0, 0, 0, 0.2),
        1.75em 1.75em 0 0em rgba(0, 0, 0, 0.2),
        0em 2.5em 0 0em rgba(0, 0, 0, 0.5),
        -1.8em 1.8em 0 0em rgba(0, 0, 0, 0.7), -2.6em 0em 0 0em #000,
        -1.8em -1.8em 0 0em rgba(0, 0, 0, 0.2);
    }
    87.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(0, 0, 0, 0.2),
        1.8em -1.8em 0 0em rgba(0, 0, 0, 0.2),
        2.5em 0em 0 0em rgba(0, 0, 0, 0.2),
        1.75em 1.75em 0 0em rgba(0, 0, 0, 0.2),
        0em 2.5em 0 0em rgba(0, 0, 0, 0.2),
        -1.8em 1.8em 0 0em rgba(0, 0, 0, 0.5),
        -2.6em 0em 0 0em rgba(0, 0, 0, 0.7), -1.8em -1.8em 0 0em #000;
    }
  }
`;