import styled from "styled-components";
import Button from "../../component/Button";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../../logo.svg";

export const Header = styled.div`
  height: 100%;
  display: flex;
  padding: 0 25px;
`;

export const HeaderSection = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  font-family: Arimo;
  color: #150e60;
  > a {
    color: inherit;
    text-decoration: none;
  }
`;
export const StyledHomeButton = styled(Button)`
  height: 79px;
  width: 300px;
  margin: 24px auto;
  display: block;
  border-radius: 100px;
  font-size: 24px;
  line-height: 40px;
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

export const OrgLogo = styled(Logo)`
  height: 100px;
  width: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const TransparentButton = styled(Button)`
  background: transparent;
  border: 1px solid white;
  color: white;
`;

export const Text = styled.span`
  font-family: Open Sans, Ariomo, Arial, sans-serif;
  font-size: 16px;
  line-height: 22px;
  font-weight: ${props => props.bold ? "bold" : "normal"};
  color: ${props => props.color ? props.color : props.theme.color.black};
`;

export const PhoneNo = styled(Text)`
  color: ${props => props.theme.color.deepPurple};
  text-decoration: underline;
`;

export const Heading = styled.h1`
  fontFamily: "Ariomo, Arial, sans-serif",
  fontWeight: "bold",
  fontSize: "36px",
  lineHeight: "40px",
  color: ${props => props.color ? props.color : props.theme.color.black};
`;

export const SubHeading = styled.h2`
  fontFamily: "Ariomo, Arial, sans-serif",
  fontWeight: "bold",
  fontSize: "36px",
  lineHeight: "40px",
  color: ${props => props.color ? props.color : props.theme.color.black};
`;
