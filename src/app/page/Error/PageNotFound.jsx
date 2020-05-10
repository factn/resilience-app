import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { Button } from "../../component";
import { Body1, H1 } from "../../component/Typography";
import pageNotFoundImg from "../../../img/app-illustrations/error_404.png";
import { routes } from "../../routing";

const pageNotFoundStyles = makeStyles((theme) => ({
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

const PageNotFound = () => {
  const classes = pageNotFoundStyles();
  const linkToHome = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to={routes.home} {...props} />
  ));
  return (
    <div className="page-not-found">
      <img
        src={pageNotFoundImg}
        alt="Page not found graphic"
        className={clsx("graphic", classes.graphic)}
      />
      <H1 className={clsx("heading", classes.heading)}>Oops!</H1>
      <Body1 className={clsx("body", classes.body)}>
        The page you are looking for cannot be found. Try refreshing the page to find it.
      </Body1>
      <Button className={clsx("cta", classes.cta)} component={linkToHome}>
        Return Home
      </Button>
    </div>
  );
};
PageNotFound.propTypes = {};

export default PageNotFound;
