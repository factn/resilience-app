import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { withFirestore } from "react-redux-firebase";
// styles
import { Typography, Button } from "@material-ui/core";
import { Page } from "../../layout";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin-top: 12vh;
  padding: 0 3vw;
`;

const StyledCopy = styled(Typography)`
  margin-top: 3vh;
`;

const StyledP = styled(Typography)`
  margin-top: 3vh;
`;

const StyledButton = styled(Button)`
  margin-top: 24px;
  flex-grow: 1;
  width: 20vw;
`;

const Status = ({ firestore }) => {
  // a happy little message
  const [thank, setThank] = useState(false);
  // find the user
  const user = useSelector((state) => state.firebase.auth);

  //function to handel the volunteers status
  function setStatus(status) {
    const userId = user.uid;

    firestore.collection("users").doc(userId).set({ status: status });

    setThank(`Thank you for your service.\nYour status has been set to ${status}`);
  }

  // change the status
  function handelStatusOnCall(event) {
    event.preventDefault();
    setStatus("OnCall");
  }
  function handelStatusAvail(event) {
    event.preventDefault();
    setStatus("Available");
  }
  function handelStatusOff(event) {
    event.preventDefault();
    setStatus("Offline");
  }

  return (
    <Page>
      <StyledHeader variant="h1">
        {" "}
        Manually set your status so others know what you are doing.{" "}
      </StyledHeader>
      <StyledCopy variant="h2"> I am... </StyledCopy>
      <StyledButton
        color="primary"
        size="large"
        variant="contained"
        onClick={(event) => handelStatusOnCall(event)}
        disableElevation
      >
        On Call
      </StyledButton>
      <br />
      <StyledButton
        color="primary"
        size="large"
        variant="contained"
        onClick={(event) => handelStatusAvail(event)}
        disableElevation
      >
        Available
      </StyledButton>
      <br />
      <StyledButton
        color="primary"
        size="large"
        variant="contained"
        onClick={(event) => handelStatusOff(event)}
        disableElevation
      >
        Offline
      </StyledButton>
      <br />
      <StyledP>{thank}</StyledP>
    </Page>
  );
};

export default withRouter(withFirestore(Status));
