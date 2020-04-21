import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const styles = () => ({
  dialogContent: {
    padding: "78px 28px 28px 26px",
  },
  closeButton: {
    position: "absolute",
    right: "18px",
    top: "16px",
    color: "#150E60",
    fontSize: "48px",
  },
  avatar: {
    height: "95px",
    width: "95px",
  },
  commentSection: {
    margin: "24px 0",
  },
  message: {
    fontWeight: 600,
    fontSize: "18px",
    marginTop: "8px",
  },
});

const PostMission = withStyles(styles)((props) => {
  const [open, setOpen] = useState(true);
  const [comment, setComment] = useState("");
  const { classes } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log(comment);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"xs"}
      onClose={handleClose}
      disableBackdropClick={true}
      aria-labelledby="post-mission"
      open={open}
    >
      <CloseIcon className={classes.closeButton} onClick={handleClose} />
      <DialogContent className={classes.dialogContent}>
        <Typography align="center" variant="h1" gutterBottom>
          Confirm Delivery
        </Typography>
        <Box display="flex" justifyContent="center">
          <Avatar
            className={classes.avatar}
            alt="Volunteer"
            src="https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg"
          />
        </Box>
        <Box className={classes.message} display="flex" justifyContent="center">
          <Typography align="center" variant="p">
            Jane has completed the
            <br></br>
            dropoff. How is everything?
          </Typography>
        </Box>
        <Box className={classes.commentSection} display="flex" justifyContent="center">
          <TextField
            id="post-mission-comment"
            multiline
            rows={6}
            value={comment}
            onChange={handleChange}
            placeholder="Show Jane some love! Write a message telling her how awesome she is!"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Button size="large" onClick={handleSubmit} fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
});

export default withRouter(PostMission);
