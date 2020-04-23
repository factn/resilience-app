import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  checkBox: {
    textAlign: "left",
    display: "flex",
  },
  body1: {
    textAlign: "left",
    // marginLeft: theme.spacing(2),
    // paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  formControl: {
    flexDirection: "row",
  },
  textArea: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
    textAlign: "left",
  },
  bodyItalics: {
    fontStyle: "italic",
    marginTop: theme.spacing(1),
    // marginLeft: theme.spacing(2),
    // paddingRight: theme.spacing(1),
    textAlign: "center",
  },
  bodyItalicsMuted: {
    textAlign: "left",
    fontStyle: "italic",
    marginTop: theme.spacing(2),
    // marginLeft: theme.spacing(2),
    // paddingRight: theme.spacing(1),
    opacity: "50%",
  },
}));

export const StyledHeader = styled(Typography)`
  margin-bottom: 1rem;
`;
export const HR = styled.hr`
  margin-top: 1rem;
`;
export const TotalsContainer = styled.div`
  padding-top: 10%;
  display: flex;
  justify-content: space-around;
`;

export const HappyBox = styled.div`
  border: 1px solid black;
  height: 7rem;
  width: 100%;
  padding: 0.7rem;
  margin-top: 1rem;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
`;
