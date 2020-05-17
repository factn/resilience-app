import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import FoodBoxIcon from "../../component/icons/FoodBoxIcon";
import { DivIcon } from "leaflet";
import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
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

  innerFoodBoxMarker: {
    width: "15px !important",
    height: "15px !important",
    transform: "translate(8px, 13px)",
    position: "relative",
  },
  markerPin: {
    width: "30px",
    height: "30px",
    borderRadius: "50% 50% 50% 0",
    backgroundColor: theme.color.blue,
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
  currentMarker: {
    background: theme.color.red,
  },
  popup: {
    width: "200px",
  },
}));

const Overview = ({ currentMission, missions, org, setSelectedMission, volunteers }) => {
  const classes = useStyles();

  const position = { lat: org.location?.lat, lng: org.location?.lng };

  const [viewport, setViewport] = useState({
    center: position,
    zoom: 12,
  });

  let filtered = missions?.filter((mission) => {
    return mission?.deliveryLocation?.lat && mission?.deliveryLocation?.lng;
  });

  const { groups, singleMissions } = Mission.getAllGroups(filtered);
  const sortedMissions = {
    groupUid: "",
    groupDisplayName: "Single Missions",
    missions: singleMissions,
  };
  groups.push(sortedMissions);
  useEffect(() => {
    if (currentMission && currentMission.deliveryLocation) {
      setViewport({ ...viewport, center: currentMission.deliveryLocation });
    }
    // eslint-disable-next-line
  }, [currentMission]);

  return (
    <Box height="100%">
      <Map
        viewport={viewport}
        onViewportChanged={setViewport}
        className={`${classes.map} data-test-leaftleft-map`}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filtered?.map((mission) => (
          <MissionMarker
            mission={mission}
            currentUid={currentMission?.uid}
            setSelectedMission={setSelectedMission}
            groups={groups}
            volunteers={volunteers}
          />
        ))}
      </Map>
    </Box>
  );
};

function MissionMarker({ currentUid, groups, mission, setSelectedMission, volunteers }) {
  console.log(mission);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  let html = `<div class='${clsx(
    classes.markerPin,
    currentUid === mission.uid && classes.currentMarker
  )}'></div>`;

  let color = "black";

  if (mission.groupDisplayName) {
    color = _.randomColor(mission.groupDisplayName);
    const GroupIconHtml = renderToString(
      <GroupWorkIcon className={classes.customGroupIcon} style={{ color: color }} />
    );
    html += GroupIconHtml;
  }
  console.log(mission);

  const FoodboxIconHtml = renderToString(<FoodBoxIcon className={classes.innerFoodBoxMarker} />);
  html += FoodboxIconHtml;

  const CustomIcon = new DivIcon({
    className: clsx(classes.customDivIcon),
    html: html,
    iconSize: [30, 42],
    iconAnchor: [15, 42], // half of width + height
  });

  return (
    <Marker
      icon={CustomIcon}
      key={mission.uid}
      position={mission.deliveryLocation}
      onClick={(event) => {
        setAnchorEl(event.target.getElement());
        setSelectedMission(mission.uid);
      }}
    >
      <Popup className={classes.popup} autoClose={true}>
        <Grid container>
          <Grid container item xs>
            {mission.groupDisplayName}
            {mission.details?.map((box, index) => {
              return (
                <div key={index}>
                  {box.quantity} x {box.displayName}
                </div>
              );
            })}
          </Grid>
          <Grid item>
            <MissionItemMenu
              groups={groups}
              mission={mission}
              volunteers={volunteers}
              boxRef={{ current: anchorEl }}
            />
          </Grid>
        </Grid>
      </Popup>
    </Marker>
  );
}

export default Overview;
