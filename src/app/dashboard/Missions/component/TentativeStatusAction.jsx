import { Grid } from "@material-ui/core";
import React, { useState } from "react";

import { Button } from "../../../component";
import { connect } from "react-redux";

import AddToGroupPopover from "./AddToGroupPopover";

const TentativeStatusAction = ({ boxRef, mission }) => {
  const groups = [
    { displayName: "whatever", id: "123" },
    { displayName: "what2", id: "1234" },
    { displayName: "what3", id: "1235" },
  ];

  const [openAddToGroupPopover, setOpenAddToGroupPopover] = useState(false);

  return (
    <Grid container>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenAddToGroupPopover(true);
          }}
        >
          Add To Group
        </Button>
      </Grid>
      <AddToGroupPopover
        open={openAddToGroupPopover}
        onClose={() => setOpenAddToGroupPopover(false)}
        boxRef={boxRef}
        groups={groups}
        mission={mission}
      />
    </Grid>
  );
};

export default connect((state) => ({
  volunteers: state.firestore.ordered.volunteers,
}))(TentativeStatusAction);
