import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const useStyles = makeStyles((theme) => ({
  body1: {
    textAlign: "left",
    marginLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export const StyledHeader = styled(Typography)`
    margin-left: 1rem;
`;
