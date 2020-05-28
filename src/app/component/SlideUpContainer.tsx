import React, { ReactNode } from "react";

import { Modal, Slide, Paper, IconButton, makeStyles, Backdrop } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    paddingTop: "5rem",
    paddingBottom: "2rem",
    width: "100%",
    maxWidth: theme.breakpoints.width("sm"),
    position: "relative",
    height: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  close: {
    position: "absolute",
    top: "0",
    right: "0",
    "& svg": {
      width: "2.5rem",
      height: "2.5rem",
    },
  },
}));

type Props = {
  show: boolean;
  onClose?: () => void;
  children: ReactNode;
  closeOnOutOfBounds?: boolean;
};

export default function SlideUpContainer({ children, closeOnOutOfBounds, onClose, show }: Props) {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={show}
      BackdropComponent={Backdrop}
      onClick={() => closeOnOutOfBounds && onClose && onClose()}
    >
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        <Paper square={true} className={classes.root}>
          <IconButton className={classes.close} onClick={onClose}>
            <Close />
          </IconButton>
          {children}
        </Paper>
      </Slide>
    </Modal>
  );
}
