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
export default function SuccessSnackbar(props) {
  const { autoHideDuration, handleClose, open, successMessage } = props;
  console.warn("Deprecation warning: SuccessSnackbar has been deprecated for Snackbar");
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {successMessage}
      </Alert>
    </Snackbar>
  );
}

SuccessSnackbar.propTypes = {
  autoHideDuration: PropTypes.number,
  children: PropTypes.element,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  errorMessage: PropTypes.string,
};

SuccessSnackbar.defaultProps = {
  autoHideDuration: 4000,
};
