import PropTypes from "prop-types";
import React from "react";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiGrid from "@material-ui/core/Grid";
import { Button, MissionList } from "../index";

/**
 * Component for a Mission group. Mission group has an ID and a Name. Mission groups displays a list of missions for a given group.
 *
 * @component
 */
const MissionGroup = ({ action, actionText, group, isEmptyText }) => {
  const history = useHistory();
  const missions = group.missions;
  const numberOfMissions = missions.length;
  const onClickAcceptMissionGroup = (groupUid) => {
    console.log("Accepted group", groupUid);
  };

  return (
    <MuiExpansionPanel className="mission-group" defaultExpanded={true}>
      <MuiExpansionPanelSummary expandIcon={<MuiExpandMoreIcon />}>
        <MuiGrid container alignContent="flex-start" justify="space-between">
          <MuiGrid item xs style={{ textAlign: "left" }} className="mission-group-name">
            {group.groupDisplayName}
          </MuiGrid>
          <MuiGrid item xs={1} style={{ textAlign: "right" }} className="mission-group-count">
            ({numberOfMissions})
          </MuiGrid>
        </MuiGrid>
      </MuiExpansionPanelSummary>
      <MuiExpansionPanelDetails>
        <MissionList
          missions={missions}
          history={history}
          isEmpty={isEmpty(missions)}
          isLoaded={isLoaded(missions)}
          isEmptyText={isEmptyText}
          callToAction={{
            text: actionText,
            onClick: (missionUid) => action(missionUid),
          }}
        />
      </MuiExpansionPanelDetails>
      <MuiExpansionPanelActions>
        <Button fullWidth={true} onClick={() => onClickAcceptMissionGroup(group.groupUid)}>
          Accept Missions ({numberOfMissions})
        </Button>
      </MuiExpansionPanelActions>
    </MuiExpansionPanel>
  );
};

MissionGroup.propTypes = {
  group: PropTypes.object,
  actionText: PropTypes.string,
  action: PropTypes.func,
};

export default MissionGroup;
