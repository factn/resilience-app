import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "../../component";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import MUIDataTable from "mui-datatables";
import { compose } from "redux";

const useStyles = makeStyles((theme) => ({
  markerPin: {},
}));

const MissionView = {
  unassigned: "Unassigned",
  tentative: "Tentative",
  assigned: "Assigned",
  inProgress: "In Progress",
  done: "Done",
};
const MissionType = {
  generic: "General Errand",
  food: "Food Delivery",
  pharmacy: "Pharmacy",
};

const MissionViewButtons = (isActive) => {
  const ViewButtonsConfig = [
    { text: MissionView.unassigned },
    { text: MissionView.tentative },
    { text: MissionView.assigned },
    { text: MissionView.inProgress },
    { text: MissionView.done },
  ];

  return (
    <>
      {ViewButtonsConfig.map((config) => (
        <Button variant="text" key={config.text}>
          {config.text}
        </Button>
      ))}
    </>
  );
};
const MissionTypeButtons = (isActive) => {
  const ViewButtonsConfig = [
    { text: MissionType.generic },
    { text: MissionType.food },
    { text: MissionType.pharmacy },
  ];
  return (
    <>
      {ViewButtonsConfig.map((config) => (
        <Button variant="text" key={config.text}>
          {config.text}
        </Button>
      ))}
    </>
  );
};

const Overview = ({ missions }) => {
  const classes = useStyles();

  const [missionView, setMissionView] = useState(MissionView.unassigned);
  const [missionType, setMissionType] = useState(MissionType.generic);
  console.log(missions);

  const columns = ["Name", "Company", "City", "State"];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];
  const options = {
    filterType: "checkbox",
  };

  return (
    <Grid container>
      <Grid container>
        <MissionViewButtons />
      </Grid>
      <Grid container>
        <MissionTypeButtons />
      </Grid>

      <MUIDataTable title={"Employee List"} data={data} columns={columns} options={options} />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
    missions: state.firestore.ordered.missions,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [{ collection: "missions" }, { collection: "users" }];
  })
)(Overview);
