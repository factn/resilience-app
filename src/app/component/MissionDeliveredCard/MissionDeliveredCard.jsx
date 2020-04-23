import { Button, Card, CardActions, CardContent, CardHeader, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

import { H5 } from "../";
import selectImage from "../../../img/selectImage.svg";
import { color } from "../../../theme";
import MissionDeliveredImagePicker from "./MissionDeliveredImagePicker";

const StyledButton = styled(Button)`
  flex-grow: 1;
`;

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontSize: 48,
    fill: color.deepPurple,
    "&:hover": {
      cursor: "pointer",
    },
  },
  cardHeader: {
    paddingBottom: theme.spacing(3),
  },
  cardTitle: {
    lineHeight: `${theme.spacing(4)}px`,
  },
  infoText: {
    lineHeight: `${theme.spacing(2.2)}px`,
  },
  submitContainer: {
    paddingBottom: theme.spacing(2),
  },
}));

/**
 * Component for showing a mission delivered card with close icon
 *
 * @component
 */
const MissionDeliveredCard = ({ completeMission, missionId, onClose }) => {
  const classes = useStyles();
  const [deliveryConfirmationImage, setDeliveryConfirmationImage] = useState(selectImage);
  const [deliveryConfirmationImageWasSelected, setDeliveryConfirmationImageWasSelected] = useState(
    false
  );

  function onImageChanged(image) {
    setDeliveryConfirmationImageWasSelected(true);
    setDeliveryConfirmationImage(image);
  }

  return (
    <Card>
      <Grid className={classes.content} direction="column" container>
        <Grid align="right" item>
          <CloseIcon align="right" className={classes.closeIcon} onClick={onClose} />
        </Grid>
        <Grid align="left" item>
          <CardHeader
            title="Take a photo of your delivery"
            titleTypographyProps={{
              variant: "h1",
              component: "span",
              className: classes.cardTitle,
            }}
            className={classes.cardHeader}
            align="center"
          />
          <MissionDeliveredImagePicker
            defaultImage={deliveryConfirmationImage}
            setCurrentImage={onImageChanged}
          />
          <CardContent>
            <H5 align="left" color="textPrimary" className={classes.infoText}>
              Make sure the photo is clear so the recipient can locate it easily!
            </H5>
          </CardContent>
          <CardActions className={classes.submitContainer}>
            <StyledButton
              color="primary"
              variant="contained"
              disableElevation
              disabled={!deliveryConfirmationImageWasSelected}
              onClick={() => completeMission(missionId, deliveryConfirmationImage)}
            >
              Submit & Complete Mission
            </StyledButton>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

MissionDeliveredCard.defaultProps = {
  missionId: "",
};

MissionDeliveredCard.propTypes = {
  /**
   * Mission details
   */
  missionId: PropTypes.string.isRequired,
  /**
   * Handler function for submit
   */
  completeMission: PropTypes.func.isRequired,
  /**
   * Dialog handler function
   */
  onClose: PropTypes.func.isRequired,
};

export default MissionDeliveredCard;
