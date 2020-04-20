import { storiesOf } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "../../component";
import Snackbar from "./Snackbar";

storiesOf("Snackbars", module).add("Success", () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <h2>Success</h2>

      <Button onClick={handleOpen}>Open</Button>
      <Button variant="outlined" onClick={handleClose}>
        Close
      </Button>

      <Snackbar
        handleClose={handleClose}
        message="This is a success message."
        open={open}
        type="success"
      />
    </>
  );
});

storiesOf("Snackbars", module).add("Error", () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <h2>Error</h2>

      <Button onClick={handleOpen}>Open</Button>
      <Button variant="outlined" onClick={handleClose}>
        Close
      </Button>

      <Snackbar
        handleClose={handleClose}
        message="This is an error message."
        open={open}
        type="error"
      />
    </>
  );
});
