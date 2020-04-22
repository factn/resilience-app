import { Card, CardActions, CardContent, CardHeader, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PropTypes from "prop-types";
import React from "react";

import { Body1 } from "./Typography";

const styles = (theme) => ({
  root: {
    textAlign: "left",
    margin: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.color.secondary,
  },
  cardHeader: {
    paddingBottom: theme.spacing(0),
  },
  cardContent: {
    paddingBottom: theme.spacing(1),
  },
});

// Can migrate this to util file later
/* eslint-disable */
const titleCase = (str) => ("" + str).charAt(0).toUpperCase() + ("" + str).substr(1);
/* eslint-enable*/

const MissionCardContent = ({ classes, contentItems }) => (
  <Grid container spacing={1} alignItems="center">
    {contentItems.map((contentItem, index) => {
      const Icon = contentItem.icon;
      const content = contentItem.content;

      return (
        <React.Fragment key={`content-item-${index + 1}`}>
          <Grid item xs={1}>
            <Icon color="primary" />
          </Grid>
          <Grid item xs={11}>
            <Body1>{content}</Body1>
          </Grid>
        </React.Fragment>
      );
    })}
  </Grid>
);
/**
 * Component for displaying mission information on a card
 *
 * @component
 */
const MissionCard = withStyles(styles)(({ children, classes, mission, ...rest }) => {
  const title = mission.title;
  const status = mission.status;
  const location = mission.pickUpLocation?.address || "no data";
  const timeWindowType = mission.pickUpWindow?.timeWindowType || "no data";
  const startTime = mission.pickUpWindow?.startTime;

  const contentItems = [
    {
      icon: PersonIcon,
      content: status,
    },
    {
      icon: LocationOnIcon,
      content: location,
    },
    {
      icon: ScheduleIcon,
      content: typeof startTime === "string" ? startTime : timeWindowType,
    },
  ];

  return (
    <Card className={classes.root} {...rest}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "h2", component: "span" }}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <MissionCardContent contentItems={contentItems} classes={classes} />
      </CardContent>
      <CardActions>{children}</CardActions>
    </Card>
  );
});

MissionCard.propTyes = {
  /**
   * Mission details
   */
  mission: PropTypes.shape({
    status: PropTypes.string,
    url: PropTypes.string,
    details: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
  }),
};

export default MissionCard;
