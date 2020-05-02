import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import { DivIcon } from "leaflet";
import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { Map, Marker, TileLayer, Popup, Tooltip } from "react-leaflet";
import _ from "../../utils/lodash";
import { Mission } from "../../model";
import MissionItemMenu from "./component/MissionItemMenu";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  preview: {
    padding: theme.spacing(2),
  },
  map: {
    width: "100%",
    height: "100%",
  },
  foodIcon: {
    backgroundColor: "red",
  },
  customGroupIcon: {
    position: "absolute",
    width: "22px",
    fontSize: "22px",
    top: "-18px",
    right: "-18px",
    margin: "10px auto",
    textAlign: "center",
  },
  customDivIcon: {
    backgroundColor: "transparent",
    border: 0,
  },
  markerPin: {
    width: "30px",
    height: "30px",
    borderRadius: "50% 50% 50% 0",
    background: "#c30b82",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "rotate(-45deg)",
    margin: "-15px 0 0 -15px",
    "&::after": {
      content: "' '",
      left: "0%",
      top: "0%",
      width: "24px",
      height: "24px",
      margin: "3px 0 0 3px",
      background: "#fff",
      position: "absolute",
      borderRadius: "50%",
    },
  },
}));

const Overview = ({ currentMission, missions, setSelectedMission, volunteers }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const position = { lat: 37.773972, lng: -122.431297 };
  const [viewport, setViewport] = useState({
    center: position,
    zoom: 12,
  });

  let filtered = missions?.filter((mission) => {
    return mission.deliveryLocation && mission.deliveryLocation.lat && mission.deliveryLocation.lng;
  });

  const { groups, singleMissions } = Mission.getAllGroups(filtered);
  const sortedMissions = {
    groupId: "",
    groupDisplayName: "Single Missions",
    missions: singleMissions,
  };
  groups.push(sortedMissions);
  useEffect(() => {
    if (currentMission) {
      if (currentMission.deliveryLocation)
        setViewport({ ...viewport, center: currentMission.deliveryLocation });
    }
    // eslint-disable-next-line
  }, [currentMission]);

  const getMarker = (mission) => {
    let html = `<div class='${classes.markerPin}'></div>`;
    if (mission.groupDisplayName) {
      const color = _.randomColor(mission.groupDisplayName);
      const GroupIconHtml = renderToString(
        <GroupWorkIcon className={classes.customGroupIcon} style={{ color: color }} />
      );
      html += GroupIconHtml;
    }
    const CustomIcon = new DivIcon({
      className: classes.customDivIcon,
      html: html,
      iconSize: [30, 42],
      iconAnchor: [15, 42], // half of width + height
    });

    return (
      <Marker
        icon={CustomIcon}
        key={mission.id}
        position={mission.deliveryLocation}
        onClick={(event) => {
          setAnchorEl(event.target.getElement());
          setSelectedMission(mission.id);
        }}
      >
        <Popup>
          <MissionItemMenu
            groups={groups}
            mission={mission}
            volunteers={volunteers}
            boxRef={{ current: anchorEl }}
          />
        </Popup>
        <Tooltip>
          <Box>
            <Box>Group: {mission.groupDisplayName}</Box>
          </Box>
        </Tooltip>
      </Marker>
    );
  };

  return (
    <Box height="100%">
      <Map
        viewport={viewport}
        onViewportChanged={setViewport}
        className={`${classes.map} data-test-leaftleft-map`}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filtered?.map((mission) => {
          return getMarker(mission);
        })}
      </Map>
    </Box>
  );
};

export default Overview;
