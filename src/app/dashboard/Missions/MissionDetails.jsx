import React from "react";
import _ from "../../utils/lodash";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "recompose";

import { H5, Body2 } from "../../component";
import Button from "../../component/Button";
import { Box, Grid, Container, Paper } from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import { makeStyles } from "@material-ui/core/styles";
import { isLoaded, isEmpty } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    height: "100%",
    overflow: "auto",
    padding: `0px ${theme.spacing(1)}px`,
  },
  cardHeader: {
    paddingBottom: theme.spacing(1),
  },
  cardAction: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  subheader: {
    marginTop: theme.spacing(0.3),
  },
  image: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  missionTypeText: {
    paddingTop: theme.spacing(0.5),
  },
  rowLabel: {
    fontWeight: 600,
    marginTop: theme.spacing(2),
  },
  deliveryDetails: {
    marginTop: theme.spacing(0.5),
  },
  rowBody: {
    flexWrap: "nowrap",
  },
  missionImage: {
    width: "100%",
    maxHeight: "200px",
  },
}));

const RowLabel = ({ classes, header }) => (
  <Body2 align="left" className={classes.rowLabel} color="textPrimary">
    <b>{header}</b>
  </Body2>
);
const RowBody = ({ classes, content, Icon }) => {
  // oh my god, isEmpty return true for a date object.
  if (_.isEmpty(content) && !_.isDate(content)) {
    return null;
  }
  content = String(content);

  return (
    <Grid container className={classes.rowBody}>
      <Box marginRight="5px">
        <Icon color="primary" />
      </Box>
      {content}
    </Grid>
  );
};
/**
 * Component for displaying mission details as a card
 *
 * @component
 */
const MissionDetailsCard = ({ mission, setselectedMissionId }) => {
  const classes = useStyles();
  const recipientPhoneNumber = _.get(mission, "recipientPhoneNumber");

  if (isLoaded(mission) && isEmpty(mission)) {
    return null;
  }
  return (
    <Grid item xs={3}>
      <Paper className={classes.root} elevation={0}>
        <Grid container direction="row-reverse">
          <Button onClick={() => setselectedMissionId(null)} variant="text">
            <CloseIcon />
          </Button>
        </Grid>
        {isLoaded(mission) && (
          <>
            <h3>{_.get(mission, "title")}</h3>
            <RowBody Icon={PersonIcon} content={_.get(mission, "status")} classes={classes} />
            <RowBody
              Icon={AttachMoneyIcon}
              content={_.get(mission, "fundedStatus")}
              classes={classes}
            />
            <Container>
              <img
                src={_.get(mission, "image")}
                label="mission"
                className={classes.missionImage}
                alt="mission details"
              />
            </Container>

            <H5 color="textSecondary">{_.get(mission, "type")}</H5>
            <Body2 className={classes.missionTypeText} color="textPrimary">
              {_.get(mission, "description")}
            </Body2>
            <RowLabel header="Pick Up Details" classes={classes} />
            <RowBody
              Icon={LocationOnIcon}
              content={_.get(mission, "pickUpLocation.address")}
              classes={classes}
            />
            <RowBody
              Icon={AccessTimeIcon}
              content={_.get(mission, "pickUpWindow.startTime")}
              classes={classes}
            />
            <RowLabel header="Delivery Details" classes={classes} />
            <RowBody
              Icon={LocationOnIcon}
              content={_.get(mission, "deliveryLocation.address")}
              classes={classes}
            />
            <RowBody
              Icon={AccessTimeIcon}
              content={_.get(mission, "deliveryWindow.startTime")}
              classes={classes}
            />
            <RowBody
              Icon={PersonIcon}
              content={_.get(mission, "recipientName")}
              classes={classes}
            />
            {recipientPhoneNumber && (
              <a href={`tel:"${recipientPhoneNumber}"`}>{recipientPhoneNumber}</a>
            )}
          </>
        )}
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  let missions = state.firestore.data.missions || {};
  return {
    user: state.firebase.auth,
    mission: missions[ownProps.missionId],
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [{ collection: "missions", doc: props.missionId }];
  })
)(MissionDetailsCard);
