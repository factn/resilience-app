import React from "react";
import _ from "../../utils/lodash";

import { H5, Body2 } from "../../component";
import Button from "../../component/Button";
import { Box, Grid, Container, Paper } from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PanToolIcon from "@material-ui/icons/PanTool";

import { makeStyles } from "@material-ui/core/styles";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { Mission } from "../../model";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    height: "100%",
    overflow: "auto",
    padding: `0px ${theme.spacing(1)}px`,
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
    alignItems: "center",
  },
  missionImage: {
    margin: theme.spacing(1),
    width: "100%",
    maxHeight: "200px",
  },
  foodBoxDetailContainer: {
    border: "1px solid lightgrey",
    borderRadius: "4px",
    fontSize: "18px",
    color: "black",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  foodBoxDetailQuantity: {
    padding: theme.spacing(1),
    borderRight: "1px solid lightgrey",
  },
  foodBoxDetailName: {
    padding: theme.spacing(1),
  },
}));

/**=====BASE COMPONENTs======**/
const RowLabel = ({ header, classes }) => (
  <Body2 align="left" className={classes.rowLabel} color="textPrimary">
    <b>{header}</b>
  </Body2>
);
const RowBody = ({ content, component, Icon, classes }) => {
  if (component) {
  } else if (_.isEmpty(content) && !_.isDate(content)) {
    content = "";
  }
  content = String(content);

  return (
    <Grid container className={classes.rowBody}>
      <Box marginRight="5px" width="20px">
        {Icon && <Icon color="primary" />}
      </Box>
      {component ? component : content}
    </Grid>
  );
};

/**=====ROW COMPONENTS=======*/

const MissionStatusRow = ({ mission, classes }) => {
  let status = _.get(mission, "status");
  switch (status) {
    case Mission.Status.unassigned:
      return <RowBody Icon={PanToolIcon} content="Looking for volunteer" classes={classes} />;
    default:
      return null;
  }
};

const MissionFundedStatusRow = ({ mission, classes }) => {
  let fundedStatus = _.get(mission, "fundedStatus");
  switch (fundedStatus) {
    case Mission.FundedStatus.fundedbydonation:
      fundedStatus = "Funded By Donation";
      break;
    case Mission.FundedStatus.fundedbyrecipient:
      fundedStatus = "Funded By Recipient";
      break;
    case Mission.FundedStatus.notfunded:
      fundedStatus = "Not Yet Funded";
      break;
  }
  return <RowBody Icon={AttachMoneyIcon} content={fundedStatus} classes={classes} />;
};

const MissionDetailsRow = ({ mission, classes }) => {
  let type = _.get(mission, "type");
  let details = _.get(mission, "missionDetails");
  if (type === "foodbox") {
    return <FoodBoxDetailsRow details={details} classes={classes} />;
  }
  return null;
};

const FoodBoxDetailsRow = ({ details, classes }) => {
  return (
    <div>
      {_.get(details, "needs")?.map((box, index) => (
        <Grid key={index} container className={classes.foodBoxDetailContainer}>
          <Grid className={classes.foodBoxDetailQuantity}>
            <b>{_.get(box, "quantity")}</b>
          </Grid>
          <Grid className={classes.foodBoxDetailName}>
            <b>{_.get(box, "name")}</b>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

const ImageRow = (imageURL, classes) =>
  imageURL ? (
    <Container>
      <img src={imageURL} label="mission" className={classes.missionImage} alt="details" />
    </Container>
  ) : null;

/**
 * Component for displaying mission details as a card
 * @component
 */
const MissionDetailsCard = ({ mission }) => {
  const classes = useStyles();
  const recipientPhoneNumber = _.get(mission, "recipientPhoneNumber");
  const history = useHistory();
  const clear = () =>
    history.replace({
      search: _.setQueryParam("missionId", ""),
    });

  if (isLoaded(mission) && isEmpty(mission)) {
    return null;
  }

  let type = _.get(mission, "type", "");

  switch (type) {
  }

  return (
    <Box width="350px">
      <Paper className={classes.root} elevation={0}>
        <Grid container direction="row-reverse">
          <Button onClick={clear} variant="text">
            <CloseIcon />
          </Button>
        </Grid>
        {isLoaded(mission) && (
          <>
            <h3>{_.get(mission, "type")}</h3>
            <MissionStatusRow mission={mission} classes={classes} />
            <MissionFundedStatusRow mission={mission} classes={classes} />
            <MissionDetailsRow mission={mission} classes={classes} />
            <ImageRow imageURL={_.get(mission, "image")} />
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
              <RowBody
                component={<a href={`tel:"${recipientPhoneNumber}"`}>{recipientPhoneNumber}</a>}
                classes={classes}
              />
            )}

            <RowLabel header="Notes" classes={classes} />
            <RowBody
              content={_.get(mission, "notes", "No additional informations")}
              classes={classes}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default MissionDetailsCard;
