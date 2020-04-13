import React from "react";
import PropTypes from "prop-types";
import { Typography, Card, CardActions, CardContent, CardHeader, Grid } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PersonIcon from "@material-ui/icons/Person";
import { withStyles } from "@material-ui/core/styles";
import { missionStatusLabel } from "../../constants";

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
  contentTypography: {
    marginLeft: theme.spacing(1),
    fontSize: `${theme.typography.fontSize}px`,
    [theme.breakpoints.up("sm")]: {
      fontSize: `${theme.typography.fontSize * 1.5}px`,
    },
  },
});

const titleCase = (str) => ("" + str).charAt(0).toUpperCase() + ("" + str).substr(1);

const MissionCardContent = ({ contentItems, classes }) => (
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
            <Typography className={classes.contentTypography}>{content}</Typography>
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
const MissionCard = withStyles(styles)(({ mission, children, classes, ...rest }) => {
  const title = mission?.title || "Mission Title";
  const location = mission.details?.pickup?.location ?? "123 Example St., San Francisco, 92501";
  const missionStartTime = mission.details?.pickup?.date ?? "2:30 P.M";
  const status = mission.status
    ? titleCase(missionStatusLabel[mission.status])
    : "Unknown Mission Status";

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
      content: missionStartTime,
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
