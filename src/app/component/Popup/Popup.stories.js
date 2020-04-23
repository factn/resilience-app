import { storiesOf } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "../";
import Popup from "./Popup";

storiesOf("Popup", module).add("Default", () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <h2>Popup</h2>

      <Button onClick={handleOpen}>Open</Button>

      <Popup
        handleClose={handleClose}
        title="This is a Popup title"
        open={open}
        btnText="Button Text"
      >
        <div>
          <span>Some fake popup content</span>
          <p>
            <ul>
              <li>item</li>
              <li>item</li>
            </ul>
          </p>
        </div>
      </Popup>
    </>
  );
});
