import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Button } from "../../component";
import { Page, Card } from "../../layout";
import { Typography, Avatar, Grid } from "@material-ui/core";

import stubImage from "../../../img/stub-image.png";
import profileImg from "../../../img/fb-profile.jpg";
import { ReactComponent as MapMarkerImg } from "../../../img/map-marker-alt.svg";
// Created based on the schema in firebase
import styled from "styled-components";

export const StyledHr = styled.hr`
  border: 1px dashed #de3254;
  width: 100%;
`;

const MissionDetailsPage = ({ mission, requester, ...props }) => {
  mission = {
    id: "asdasd",
    description: "Buy audrey groceries",
    status: "open",
    details:
      "Audrey is an elderly woman, who is unable to visit the grocery store. She would like someone to deliver a gallon of milk, a loaf of wheat bread and one carton of eggs.",
  };
  requester = {
    name: "Audrey",
    address: "123 Example st, San Fransisco, 92501",
  };

  return (
    <Page>
      <Card flat>
        <img src={stubImage} />
      </Card>
      <Card flat>
        <Typography variant="h2">{mission.description}</Typography>
        <Typography variant="h4">status: {mission.status}</Typography>
        <Grid>
          <Button text="Edit request" />
          <Button disabled text="No workers yet" />
        </Grid>
        <StyledHr />
        <Grid container>
          <Grid item>
            <Avatar src={profileImg} />
          </Grid>
          <Grid item>
            <Typography variant="h4">{requester.name}</Typography>
          </Grid>
          <MapMarkerImg />
          <Typography variant="h6">{requester.address}</Typography>
        </Grid>
        <Typography variant="body">{mission.details}</Typography>
      </Card>
    </Page>
  );
};
export default MissionDetailsPage;
