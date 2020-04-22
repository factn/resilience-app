import styled from "styled-components";

export const Header = styled.h1`
  color: black;
  max-width: 100%;
  text-align: left;
  padding: 0 2vw;
`;

export const Body = styled.p`
  text-align: left;
  padding: 5vh 2vw;
`;

export const LogoBox = styled.div`
  display: flex;
`;

export const LogoImage = styled.img`
  height: 72px;
`;

export const LogoText = styled.p`
  color: #150e60;
  font-size: 52px;
`;

export const Link = styled.a`
  color: black;
  text-align: left;
  display: flex;
  padding: 4vh 4vw;
  u {
    cursor: pointer;
  }
  u:hover {
    color: #150e60;
  }
`;
