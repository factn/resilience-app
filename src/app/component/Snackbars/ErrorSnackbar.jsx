import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * @deprecated SuccessSnackbar has been combined with ErrorSnackbar in Snackbar
 */
function ErrorSnackbar({ autoHideDuration, errorMessage, handleClose, open }) {
  console.warn("Deprecation warning: ErrorSnackbar has been deprecated for Snackbar");
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
ErrorSnackbar.propTypes = {
  autoHideDuration: PropTypes.number,
  children: PropTypes.element,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  errorMessage: PropTypes.string,
};

ErrorSnackbar.defaultProps = {
  autoHideDuration: 4000,
};

export default ErrorSnackbar;
