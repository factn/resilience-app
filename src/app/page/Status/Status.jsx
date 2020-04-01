import React, { useState } from "react";
import { useFirestore, firestoreConnect } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getFirebase, withFirestore } from "react-redux-firebase";
// objects
import { User } from "../../model";
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
  const [Thank, setThank] = useState(false);
  // find the user
  const firebase = getFirebase();
  const user = useSelector((state) => state.firebase.auth);

  //function to handel the volunteers status
  function setStatus(status) {
    const userId = user.uid;

    firestore.collection("users").doc(userId).set({ status: status });

    setThank(`Thank You for your service.\nYour status has been set to ${status}`);
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
        onClick={() => setStatus("OnCall")}
        disableElevation
      >
        On Call
      </StyledButton>
      <br />
      <StyledButton
        color="primary"
        size="large"
        variant="contained"
        onClick={() => setStatus("Available")}
        disableElevation
      >
        Available
      </StyledButton>
      <br />
      <StyledButton
        color="primary"
        size="large"
        variant="contained"
        onClick={() => setStatus("Offline")}
        disableElevation
      >
        Offline
      </StyledButton>
      <br />
      <StyledP>{Thank}</StyledP>
    </Page>
  );
};

export default withRouter(withFirestore(Status));
