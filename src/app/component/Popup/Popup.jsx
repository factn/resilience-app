import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

export default function Popup(props) {
  const { btnText, children, handleClose, open, title } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          {btnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Popup.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.element,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
};
