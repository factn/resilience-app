import React from "react";
import Grid from "@material-ui/core/Grid";
import ComingSoonImage from "../../../img/HomeImage1.png";

const ComingSoon = () => {
  return (
    <div>
      <Grid container direction="column" alignContent="center" alignItems="center">
        <Grid item>
          <h1>Coming soon</h1>
        </Grid>
        <Grid item>
          <img src={ComingSoonImage} alt="Coming soon" />
        </Grid>
      </Grid>
    </div>
  );
};

export default ComingSoon;
