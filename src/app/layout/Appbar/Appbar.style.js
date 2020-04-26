import { Link } from "react-router-dom";
import styled from "styled-components";

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
  align-items: center;
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

export const AboutLink = styled(Link)`
  text-decoration: none;
  color: #3739b5;
  cursor: pointer;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
`;
