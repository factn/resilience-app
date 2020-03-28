import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Page, Card } from "../../layout";
import { Chip } from "../../component";
import { StyledImage, StyledHr } from "./UserProfile.style";
import { Typography } from "@material-ui/core";

const UserProfile = ({ history, ...props }) => {
  return (
    <Page template="pink">
      <Card flat template="pink">
        <Typography variant="h2">Profile</Typography>
        <StyledImage> image here</StyledImage>

        <Typography variant="h2">Linda</Typography>
        <Typography variant="h5">9 months 4.5 Rating</Typography>
      </Card>
      <Card flat>
        <Typography variant="h3">Missions</Typography>
        <div>
          <Chip label="Driving" />
          <Chip label="Grocery" />
          <Chip label="Shopping" />
        </div>
        <StyledHr />
        <Typography variant="h3">Recent Missions</Typography>
        <p>Get Audreys Groceries 5/5</p>
        <p>Put out fire 5/5</p>
      </Card>
    </Page>
  );
};

UserProfile.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(UserProfile);
