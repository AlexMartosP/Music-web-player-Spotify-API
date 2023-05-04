import styled from "styled-components";

export const LoadingAnimation = styled.div`
  display: flex;
  justify-content: center;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    left: -100px;
    position: relative;
    color: #fff;
    animation: shadowRolling 2s linear infinite;
  }

  @keyframes shadowRolling {
    0% {
      box-shadow: 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0),
        0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }
    12% {
      box-shadow: 100px 0 #fff, 0px 0 rgba(255, 255, 255, 0),
        0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }
    25% {
      box-shadow: 110px 0 #fff, 100px 0 #fff, 0px 0 rgba(255, 255, 255, 0),
        0px 0 rgba(255, 255, 255, 0);
    }
    36% {
      box-shadow: 120px 0 #fff, 110px 0 #fff, 100px 0 #fff,
        0px 0 rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow: 130px 0 #fff, 120px 0 #fff, 110px 0 #fff, 100px 0 #fff;
    }
    62% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 #fff, 120px 0 #fff,
        110px 0 #fff;
    }
    75% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
        130px 0 #fff, 120px 0 #fff;
    }
    87% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
        200px 0 rgba(255, 255, 255, 0), 130px 0 #fff;
    }
    100% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
        200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
    }
  }
`;
