import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "../../component";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import { compose } from "redux";
import Missions from "../../model/Missions";
import { MissionType, MissionStatus, MissionFundedStatus } from "../../model/schema";
import _ from "lodash";
import MapView from "./MissionsMapView";
import MissionsMapView from "./MissionsMapView";

const useStyles = makeStyles((theme) => ({
  markerPin: {},
}));

const MissionStatusButtons = ({ missionStatus, setMissionStatus }) => {
  const ordered = [
    MissionStatus.unassigned,
    MissionStatus.tentative,
    MissionStatus.assigned,
    MissionStatus.started,
    MissionStatus.delivered,
  ];

  return (
    <>
      {ordered.map((text) => (
        <Button
          variant={missionStatus === text ? "contained" : "text"}
          key={text}
          onClick={() => setMissionStatus(text)}
        >
          {text}
        </Button>
      ))}
    </>
  );
};
const MissionTypeButtons = ({ missionType, setMissionType }) => {
  const ordered = [MissionType.errand, MissionType.foodbox, MissionType.pharmacy];
  return (
    <>
      {ordered.map((text) => (
        <Button
          variant={missionType === text ? "contained" : "text"}
          key={text}
          onClick={() => setMissionType(text)}
        >
          {text}
        </Button>
      ))}
    </>
  );
};

const Overview = ({ missions }) => {
  const classes = useStyles();

  const [missionStatus, setMissionStatus] = useState(MissionStatus.unassigned);
  const [missionType, setMissionType] = useState(MissionType.errand);
  const [data, setData] = useState();

  useEffect(() => {
    Missions.repo()
      .whereEqualTo("status", missionStatus)
      .whereEqualTo("type", missionType)
      .find()
      .then((result) => {
        result.forEach((el) => {
          el.pickup = {
            time: el.pickUpWindow,
            location: el.pickUpLocation,
          };
          el.delivery = {
            time: el.deliveryWindow,
            location: el.deliveryLocation,
          };
          el.funded = MissionFundedStatus.notfunded === el.fundedStatus ? "no" : "yes";
        });
        setData(result);
      });
  }, [missionStatus, missionType]);

  const pickupBodyRender = (value, tableMeta, updateValue) => {
    if (!value) return null;
    return (
      <div>
        <div>{value.time?.startTime}</div>
        <div>{value.time?.timeWindowType}</div>
        <div>{value.location?.address}</div>
      </div>
    );
  };
  const pickupCol = {
    name: "pickup",
    options: { customBodyRender: pickupBodyRender },
  };
  const deliveryCol = {
    name: "delivery",
    options: { customBodyRender: pickupBodyRender },
  };

  const columns = ["title", "status", pickupCol, deliveryCol, "funded"];

  const options = {
    filterType: "checkbox",
  };

  return (
    <Grid container>
      <MissionsMapView missions={data} />
      <Grid container role="content">
        <MissionStatusButtons missionStatus={missionStatus} setMissionStatus={setMissionStatus} />
      </Grid>
      <Grid container>
        <MissionTypeButtons missionType={missionType} setMissionType={setMissionType} />
      </Grid>
      <MUIDataTable title={"Missions"} data={data} columns={columns} options={options} />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps))(Overview);
