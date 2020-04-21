import styled from "styled-components";
import { Link } from "react-router-dom";

export const AppbarContainer = styled.div`
  height: 89px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: white;
`;

export const AppbarDefault = styled.div`
  height: inherit;
  box-sizing: border-box;
  display: flex;
`;
export const LogoContainer = styled.div`
  height: inherit;
  width: 100px;
  margin-right: auto;
  cursor: pointer;
  > svg {
    height: inherit;
  }
`;
export const MenuContainer = styled.div`
  height: inherit;
  width: 100px;
  cursor: pointer;
  margin-left: auto;
  > svg {
    height: inherit;
    width: 2em;
  }
`;

export const StyledLink = styled(Link)`
  font-family: Arimo;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 20px;
  color: #3739B5;
  text-decoration: none;
  height: fit-content;
  margin: auto 20px;
`;
