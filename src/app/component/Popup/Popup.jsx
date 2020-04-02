import React from "react";
import PropTypes from "prop-types";
import { Dialog, Button, DialogContent, DialogTitle, DialogActions } from "@material-ui/core";

export default function Popup(props) {
  const { title, children, open, handleClose, btnText } = props;

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
  title: PropTypes.string,
  handleClose: PropTypes.func,
  btnText: PropTypes.string,
  open: PropTypes.bool,
};
