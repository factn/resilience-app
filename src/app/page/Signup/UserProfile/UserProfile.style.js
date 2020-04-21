import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const useStyles = makeStyles((theme) => ({
  body1: {
    textAlign: "center",
    marginLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  body2: {
    borderTop: "1px solid grey",
    textAlign: "left",
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  checkBox: {
    marginTop: theme.spacing(2),
    textAlign: "left",
  },
  button: {
    marginTop: theme.spacing(2),
    width: "250px",
    background: "#3739b5",
    color: "white",
  },
}));

export const StyledHeader = styled(Typography)`
  padding: 1.2vh 0;
  margin-left: 10%;
  ${({ main }) =>
    main &&
    `margin-left: 0px;
  text-transform: none;`}
`;
