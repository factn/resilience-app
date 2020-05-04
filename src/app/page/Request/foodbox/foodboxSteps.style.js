import { makeStyles } from "@material-ui/core/styles";
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
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
  },
  formControl: {
    flexDirection: "row",
  },
  textArea: {
    marginTop: theme.spacing(1.5),
  },
  textField: {
    marginTop: theme.spacing(1.5),
    textAlign: "left",
  },
  bodyItalics: {
    fontStyle: "italic",
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  bodyItalicsMuted: {
    textAlign: "left",
    fontStyle: "italic",
    marginTop: theme.spacing(1.5),
    opacity: "50%",
  },
}));

export const HR = styled.hr`
  margin-top: 1rem;
  border-bottom: none;
`;
export const TotalsContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-around;
`;

export const HappyBox = styled.div`
  border: 1px solid black;
  height: auto;
  width: 100%;
  padding: 0.7rem;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
`;
