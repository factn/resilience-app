import React from "react";
import { H5 } from "../../component";
import { Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  profileImage: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: "12px auto 8px auto",
  },
}));

const UserStatus = ({ photoURL, displayName }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center">
      <Avatar className={classes.profileImage} src={photoURL} alt={displayName} />
      <H5>{displayName}</H5>
    </Grid>
  );
};
export default UserStatus;
