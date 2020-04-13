import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "../../component";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import MUIDataTable from "mui-datatables";
import { compose } from "redux";
import Missions from "../../model/Missions";
import { MissionType, MissionStatus, Mission } from "../../model/schema";
import _ from "lodash";

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
          onClick={() => {
            setMissionStatus(text);
          }}
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
          onClick={() => {
            setMissionType(text);
          }}
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

  console.log(missionType);

  useEffect(() => {
    Missions.repo()
      .whereEqualTo("status", missionStatus)
      .whereEqualTo("type", missionType)
      .find()
      .then((result) => {
        setData(result);
      });
  }, [missionStatus, missionType]);

  const columns = ["title", "status", "pickupWindow.startTime"];

  const options = {
    filterType: "checkbox",
    onTableChange: (action, tableState) => {
      console.log(action);
    },
  };
  console.log(data);

  return (
    <Grid container>
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
