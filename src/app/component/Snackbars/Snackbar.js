import MUISnackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import React from "react";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Snackbar = ({ autoHideDuration, handleClose, message, open, type }) => {
  return (
    <MUISnackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </MUISnackbar>
  );
};

Snackbar.propTypes = {
  autoHideDuration: PropTypes.number,
  message: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  type: PropTypes.oneOf("success", "error"),
};

Snackbar.defaultProps = {
  open: false,
  autoHideDuration: 4000,
};

export default Snackbar;
