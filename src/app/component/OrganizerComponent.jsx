import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import User from "../model/User";

const OrganizerComponent = ({ children, currentUser }) => {
  if (!currentUser) return null;
  if (currentUser && !currentUser.isOrganizer) return null;
  return <>{children}</>;
};

OrganizerComponent.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => {
  let user = User.load(state.firestore.data.currentUser);
  return {
    currentUser: user,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "users",
        doc: props.auth.uid,
        storeAs: "currentUser",
      },
    ];
  })
)(OrganizerComponent);
