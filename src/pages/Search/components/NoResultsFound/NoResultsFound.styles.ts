import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(Link)`
  margin-block-start: 1.5rem;
  padding: 0.875rem 4rem;
  background-color: var(--clr-black);
  color: var(--clr-white);
  border-radius: 50vh;
  text-decoration: none;
`;
