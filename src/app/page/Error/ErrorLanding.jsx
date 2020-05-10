import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import MuiContainer from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { Page } from "../../layout";
import PageNotFound from "./PageNotFound";
import Unauthorized from "./Unauthorized";

const errorLandingStyles = makeStyles((theme) => ({
  errorContent: {
    padding: "1rem",
  },
}));
/**
 * Component for Error landing page
 *
 * @component
 */
const ErrorLanding = ({ errorCode }) => {
  const classes = errorLandingStyles();

  return (
    <Page className="error-page">
      <MuiContainer className={clsx("error-page-content", classes.errorContent)}>
        {
          {
            401: <Unauthorized />,
            404: <PageNotFound />,
          }[errorCode]
        }
      </MuiContainer>
    </Page>
  );
};
ErrorLanding.propTypes = {
  errorCode: PropTypes.number,
};

export default ErrorLanding;
