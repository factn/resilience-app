import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { useSelector, connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import Logo from "../../../img/logo.svg";
import { Page, Card } from "../../layout";
import { MissionCard, Button } from "../../component";

import { BigLogo, MissionText, StyledHomeButton } from "./Home.style";

const HomePage = ({ history, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missionsVolunteered);
  const isEmpty = useSelector((state) => state.firebase.auth.isEmpty);
  const isLoaded = useSelector((state) => state.firebase.auth.isLoaded);

  return (
    <Page isLoaded={isLoaded}>
      {isEmpty ? (
        <>
          <BigLogo src={Logo} />
          <MissionText>Global Community, Local Mutual Aid</MissionText>
          <StyledHomeButton onClick={() => history.push("/login")}>Sign In/Up</StyledHomeButton>
          <StyledHomeButton onClick={() => history.push("/missions")}>
            View Missions
          </StyledHomeButton>
          <StyledHomeButton
            onClick={() => history.push("/request/create")}
            text="Request Help"
            secondary
          />
          <StyledHomeButton onClick={() => history.push("/about")}>About</StyledHomeButton>
        </>
      ) : (
        <>
          <StyledHomeButton
            onClick={() => history.push("/request/create")}
            text="Request Help"
            secondary
          />
          {missions && (
            <StyledHomeButton text="View Other Missons" onClick={() => history.push("/missions")} />
          )}
          {missions?.map((mission) => (
            <Card key={mission.id}>
              <MissionCard mission={mission} />
              <div>
                <Button
                  text="Details"
                  onClick={() => {
                    history.push(`/missions/${mission.id}`);
                  }}
                />
              </div>
            </Card>
          ))}
        </>
      )}
    </Page>
  );
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "missions",
        where: [["volunteerId", "==", props.auth.uid]],
        storeAs: "missionsVolunteered",
      },
    ];
  })
)(withRouter(HomePage));
