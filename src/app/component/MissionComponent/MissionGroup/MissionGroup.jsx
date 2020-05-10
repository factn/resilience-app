import PropTypes from "prop-types";
import React from "react";
import clsx from "clsx";
import { isLoaded } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiButton from "@material-ui/core/Button";
import MuiGrid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ShowDeliveryRoute from "../../ShowDeliveryRoute";

import MissionList from "../MissionList";

const missionGroupStyles = makeStyles((theme) => ({
  expansionPanelSummary: {
    ...theme.typography.h6,
    letterSpacing: "1px",
    background: theme.color.black,
    color: theme.color.white,
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    textTransform: "uppercase",
  },
  expandMoreIcon: {
    color: theme.color.white,
  },
  groupName: {
    textAlign: "left",
  },
  missionCount: {
    textAlign: "right",
  },
  details: {
    padding: 0,
  },
  action: {
    position: "relative",
  },
  actionDisabledOver: {
    background: "rgba(245, 245, 245, 0.9)",
    height: "100%",
    width: "100%",
    zIndex: 1,
    position: "absolute",
  },
}));

/**
 * Component for a Mission group. Mission group has an ID and a Name. Mission groups displays a list of missions for a given group.
 *
 * @component
 */
const MissionGroup = ({ callToAction, group, groupCallToAction, showViewRoute }) => {
  const { icon, onClick, text } = callToAction || {};
  const { actionIcon, actionText } = { actionText: text, actionIcon: icon };

  // default to false if not set
  const { checkGroupActionDisabled, groupActionIcon, showGroupAction } = groupCallToAction || {};
  const classes = missionGroupStyles();
  const history = useHistory();
  const missions = group.missions;
  const numberOfMissions = missions.length;
  const onClickMissionGroupButton = (groupUid) => {
    missions.forEach((mission) => {
      onClick(mission.uid);
    });
  };

  const viewRoute = showViewRoute && <ShowDeliveryRoute missions={missions} />;

  const groupAction = showGroupAction && (
    <MuiButton
      fullWidth={true}
      startIcon={groupActionIcon}
      onClick={() => onClickMissionGroupButton(group.groupUid)}
    >
      {actionText} ({numberOfMissions})
    </MuiButton>
  );

  return (
    <MuiExpansionPanel className="mission-group" defaultExpanded={true}>
      <MuiExpansionPanelSummary
        expandIcon={
          <MuiExpandMoreIcon className={clsx("mission-group-expand", classes.expandMoreIcon)} />
        }
        className={clsx("mission-group-heading", classes.expansionPanelSummary)}
      >
        <MuiGrid container alignContent="flex-start" justify="space-between">
          <MuiGrid item xs className={clsx("mission-group-name", classes.groupName)}>
            {group.groupDisplayName}
          </MuiGrid>
          <MuiGrid item xs={1} className={clsx("mission-group-count", classes.missionCount)}>
            ({numberOfMissions})
          </MuiGrid>
        </MuiGrid>
      </MuiExpansionPanelSummary>
      <MuiExpansionPanelDetails className={clsx("mission-group-details", classes.details)}>
        <MissionList
          missions={missions}
          history={history}
          isLoaded={isLoaded(missions)}
          callToAction={{
            text: actionText,
            icon: actionIcon,
            onClick: (missionUid) => onClick(missionUid),
          }}
        />
      </MuiExpansionPanelDetails>
      <MuiExpansionPanelActions>
        <MuiGrid className={classes.action}>
          {checkGroupActionDisabled && checkGroupActionDisabled(missions) && (
            <MuiGrid className={classes.actionDisabledOver} />
          )}
          {viewRoute}
          {groupAction}
        </MuiGrid>
      </MuiExpansionPanelActions>
    </MuiExpansionPanel>
  );
};

MissionGroup.propTypes = {
  group: PropTypes.object,
  groupCallToAction: PropTypes.object,
  callToAction: PropTypes.object,
  showViewRoute: PropTypes.bool,
};

export default MissionGroup;
