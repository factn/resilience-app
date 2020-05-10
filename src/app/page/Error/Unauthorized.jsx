import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { Button } from "../../component";
import { Body1, H1 } from "../../component/Typography";
import unauthorizedImg from "../../../img/app-illustrations/error_401.png";

const unauthorizedStyles = makeStyles((theme) => ({
  graphic: {
    height: "100%",
    width: "100%",
  },
  heading: Object.assign(theme.typography.h1, {
    textAlign: "center",
    marginBottom: "1rem",
  }),
  body: {
    marginBottom: "1.5rem",
  },
  cta: {
    textAlign: "center",
  },
}));

const Unauthorized = () => {
  const classes = unauthorizedStyles();
  const linkToHome = React.forwardRef((props, ref) => <RouterLink ref={ref} to="/" {...props} />);

  return (
    <div className="unauthorized">
      <img
        src={unauthorizedImg}
        alt="Unauthorized Access graphic"
        className={clsx("graphic", classes.graphic)}
      />
      <H1 className={clsx("heading", classes.heading)}>Unauthorized Access</H1>
      <Body1 className={clsx("body", classes.body)}>
        Drats! You can’t view this page with your current credentials.
      </Body1>
      <Button className={clsx("cta", classes.cta)} component={linkToHome}>
        Return Home
      </Button>
    </div>
  );
};
Unauthorized.propTypes = {};

export default Unauthorized;
