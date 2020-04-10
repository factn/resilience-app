import React from "react";
import PropTypes from 'prop-types';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Component for displaying success alerts
 *
 * @component
 */
export default function SuccessSnackbar(props) {
  const { open, handleClose, successMessage, autoHideDuration } = props;
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {successMessage}
      </Alert>
    </Snackbar>
  );
}

SuccessSnackbar.propTypes = {
  autoHideDuration: PropTypes.bool,
  children: PropTypes.any,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  errorMessage: PropTypes.string,
};

SuccessSnackbar.default = {
  autoHideDuration: 4000,
};
