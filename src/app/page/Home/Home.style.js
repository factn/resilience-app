import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../component/Button";
import { ReactComponent as Logo } from "../../../logo.svg";
import HomeImage2 from "../../../img/HomeImage2.png";
import HomeImage3 from "../../../img/HomeImage3.png";
import HomeImage4 from "../../../img/HomeImage4.png";
import SplashImage1 from "../../../img/SplashImage1.png";

export const useStyles = makeStyles((theme) => ({
  SigninButton: {
    width: "200px",
    height: "48px",
    margin: "24px auto",
  },
  SignupButton: {
    width: "100%",
    height: "48px",
    margin: "12px auto",
  },
  LoadingScreenContainer: {
    width: "inherit",
    overflowX: "hidden",
  },
  SplashImage: {
    height: "calc(100vh - 98px)",
  },
  SplashTitle: {
    position: "absolute",
    top: "30vh",
    left: "0",
    right: "0",
    margin: "auto",
    color: "white",
  },
  SplashSub: {
    position: "absolute",
    top: "40vh",
    left: "0",
    right: "0",
    margin: "auto",
    color: "white",
    fontSize: "24px",
  },
  OrgBlock: {
    backgroundImage: `url(${SplashImage1})`,
    backgroundSize: "100% 100%",
    minHeight: "450px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      minHeight: "350px",
    },
  },
  NeedHelpSection: {
    backgroundImage: `url(${HomeImage3})`,
    backgroundSize: "100% 100%",
    height: "240px",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      height: "150px",
    },
  },
  WhiteBgText: {
    background: "rgb(255, 255, 255, 0.8)",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    margin: "auto",
  },
  BgBlack: {
    backgroundColor: "black",
  },
  WantToHelpSection: {
    backgroundImage: `url(${HomeImage4})`,
    backgroundSize: "100% 100%",
    height: "240px",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      height: "150px",
    },
  },
  PurpleBg: {
    backgroundColor: "#150E60",
  },
  Emoticon: {
    height: "36px",
    width: "36px",
    marginLeft: theme.spacing(1),
    verticalAlign: "middle",
  },
  RequestByPhoneBg: {
    backgroundImage: `url(${HomeImage2})`,
    backgroundSize: "100% 100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "350px",
    [theme.breakpoints.down("xs")]: {
      height: "250px",
    },
  },
  PhoneCard: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    overflow: "visible",
    position: "absolute",
    "& > img": {
      position: "absolute",
      top: "0px",
      left: "0px",
      transform: "translate(-50%, -50%)",
    },
  },
}));

export const OrgLogo = styled(Logo)`
  height: 100px;
  width: 100px;
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
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  color: ${(props) => props.color || props.theme.color.black};
`;

export const Link = styled.a`
  color: ${(props) => props.theme.color.deepPurple};
  font-family: Open Sans, Ariomo, Arial, sans-serif;
  font-size: 16px;
  line-height: 22px;
`;

export const Heading = styled.h1`
  font-family: Open Sans, sans-serif;
  font-weight: bold;
  font-size: 32px;
  line-height: 48px;
  color: ${(props) => props.color || props.theme.color.black};
`;

export const SubHeading = styled.h2`
  font-family: Open Sans, sans-serif;
  font-weight: semi-bold;
  font-size: 24px;
  line-height: 36px;
  color: ${(props) => props.color || props.theme.color.black};
`;
