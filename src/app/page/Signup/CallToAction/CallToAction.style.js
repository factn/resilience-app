import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const useStyles = makeStyles((theme) =>  ({
  body1: {
    textAlign: 'left',
    marginLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2)
  },
  button: {
    width: '250px',
    background: '#02bd7e',
    color: 'white',
  }
}))

export const StyledHeader = styled(Typography)`
  margin-top: 0.8vh;
  padding: 1.2vh 0;
  margin-left: 10%;
  ${({ main }) =>
    main &&
    `margin-left: 0px;
  text-transform: none;`}
`;

