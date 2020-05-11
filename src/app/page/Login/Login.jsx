import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { Redirect, useHistory } from "react-router-dom";

import FirebaseAuthUi from "../../component/FirebaseAuthUi/FirebaseAuthUi";
import Popup from "../../component/Popup";
import { Page } from "../../layout";
import { firstTimeSignIn } from "./firebaseLogin";
import { H6, TypographyWrapper } from "../../component";
import { routes } from "../../routing";

/**
 * Component for Login Page
 *
 * @component
 */
const LoginPage = (props) => {
  const history = useHistory();
  const auth = useSelector((state) => state.firebase.auth);
  const [popupOpen, setPopupOpen] = useState(true);

  const DisplayLoginWarning = () => {
    if (props.location.state !== undefined)
      return props.location.state.warning === true ? (
        <H6>You are not logged in. Please sign in to view this page.</H6>
      ) : null;
  };
  function handlePopupClose() {
    setPopupOpen(false);
    history.push(routes.home);
  }

  if (!isLoaded(auth)) {
    return <CircularProgress />;
  } else if (isEmpty(auth)) {
    return (
      <Page>
        {DisplayLoginWarning()}
        <FirebaseAuthUi />
      </Page>
    );
  } else {
    if (firstTimeSignIn(auth)) {
      return (
        <Page>
          <Popup open={popupOpen} handleClose={handlePopupClose} btnText="Home Page">
            <TypographyWrapper>Your account has been created. Welcome!</TypographyWrapper>
          </Popup>
        </Page>
      );
    }
    return <Redirect to={routes.home} />;
  }
};

LoginPage.propTypes = {
  /**
   * Location object provided by React Router
   */
  location: PropTypes.object.isRequired,
};

export default LoginPage;
