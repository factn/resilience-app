import React, { useState } from "react";
// components
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//icons
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PeopleIcon from "@material-ui/icons/People";
import PanToolIcon from "@material-ui/icons/PanTool";
import PhoneIcon from "@material-ui/icons/Phone";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import AddCircleIcon from "@material-ui/icons/AddCircle";

//TODO
// ONCE OVER DESIGNS WITH DAVID
// 100% FUNCTIONALITY

const useStyles = makeStyles((theme) => ({
  addMissionContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "15px 25px",
    position: "absolute",
    width: "721px",
    left: "83px",
    top: "83px",
    boxShadow: "2px 10px 6px rgba(0, 0, 0, 0.19)",
  },
  title: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    color: "#3739B5",
    fontSize: "50px",
    paddingTop: "10px",
  },
  titleHeader: {
    color: "#3739B5",
    fontSize: "42px",
    margin: "18px 9px",
    fontWeight: "bold",
  },
  inputHeader: {
    color: "#3739B5",
    fontWeight: "600",
    fontSize: "26px",
    margin: "15px 0",
    textAlign: "left",
  },
  select: {
    maxWidth: "50%",
  },
  form: {
    padding: "10px",
  },
  optionalTagBox: {
    display: "flex",
    flexDirection: "row",
  },
  optionalTag: {
    color: "grey",
    occupancy: "0.5",
    fontSize: "10px",
    padding: "0 5px",
    margin: "15px 0",
  },
  dualForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  form2: {
    margin: "10px",
    width: "100%",
  },
  inputHeader2: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
    padding: "5px",
    marginBottom: "5px",
  },
  optionalTag2: {
    color: "grey",
    occupancy: "0.5",
    lineHeight: "24px",
    fontSize: "10px",
    padding: "0 5px",
    margin: "4px 0",
  },
  header2Icons: {
    color: "#3739B5",
    marginTop: "3px",
  },
  dualSelect: {
    maxWidth: "100%",
  },
  dualText: {
    margin: "10px 0",
  },
  bigTextField: {
    heigh: "150px",
  },
  button: {
    background: "#3739B5",
    margin: "15px 0",
    color: "white",
    padding: "10px",
    width: "100%",
  },
  sideBySideSelect: {
    display: "flex",
    margin: "10px",
  },
  numSelector: {
    width: "100px",
  },
  selectCreateButton: {
    textAlign: "left",
    padding: "10px",
    color: "#3739B5",
    maxWidth: "50%",
  },
}));

const CreateMission = () => {
  const classes = useStyles();
  const [missionType, setMissionType] = useState("default");

  const handleChangeMissionType = (event) => {
    setMissionType(event.target.value);
  };

  // This handles all the food box inputs that are added to food box missions
  const [foodBoxInputCount, setFoodBoxInputCount] = useState([]);
  function addToFBCount() {
    setFoodBoxInputCount([...foodBoxInputCount, foodBoxInputCount.length + 1]);
  }

  return (
    <Container maxWidth="sm">
      <Typography className={classes.addMissionContainer} component="div">
        <div className={classes.title}>
          <AnnouncementIcon className={classes.icon} />
          <Typography className={classes.titleHeader}>Add New Mission</Typography>
        </div>
        <Divider variant="middle" />
        <Typography className={classes.inputHeader}>Mission Type</Typography>
        <FormControl className={classes.form}>
          <Select
            variant="outlined"
            className={classes.select}
            value={missionType}
            onChange={handleChangeMissionType}
            labelId="smt"
          >
            <MenuItem value="default">Select Mission Type</MenuItem>
            <MenuItem value="food-box">Food Box</MenuItem>
          </Select>
        </FormControl>
        {/* THIS PART SPAWNS BASED ON WHAT MISSION TYPE WAS SELECTED */}
        {missionType === "food-box" ? (
          <>
            <Typography className={classes.inputHeader}>Select Food Box Options</Typography>
            <FormControl className={classes.form}>
              {/* DETERMINE FOOD BOX TYPES */}

              {foodBoxInputCount.map((index) => {
                return (
                  <div className={classes.sideBySideSelect} key={index}>
                    <Select variant="outlined" className={classes.select} value="default">
                      <MenuItem value="default">Select Food Box Type</MenuItem>
                      <MenuItem value="fnv">Fruits & Veggies</MenuItem>
                      <MenuItem value="non-p">Non-Perishables</MenuItem>
                      <MenuItem value="meat">Meat</MenuItem>
                    </Select>

                    <TextField type="number" variant="outlined" className={classes.numSelector} />
                  </div>
                );
              })}

              <Button className={classes.selectCreateButton} onClick={(e) => addToFBCount(e)}>
                <AddCircleIcon style={{ marginRight: "5px", color: "#3739B5" }} />
                Add Food Box
              </Button>
            </FormControl>
          </>
        ) : null}
        <Divider variant="middle" />

        <div className={classes.optionalTagBox}>
          <Typography className={classes.inputHeader}>Funding Details </Typography>
          <Typography className={classes.optionalTag}> - optional</Typography>
        </div>
        <FormControl className={classes.form}>
          <Select
            variant="outlined"
            className={classes.select}
            value="default"
            startAdornment={
              <InputAdornment position="start">
                <AttachMoneyIcon style={{ color: "#3739B5" }} />
              </InputAdornment>
            }
          >
            {" "}
            {/* THIS WILL HAVE TO HAVE A DYNAMIC INITIAL VALUE */}
            <MenuItem value="default">Not Funded Yet</MenuItem>
            <MenuItem value={0}>Needs Funding</MenuItem>
          </Select>
        </FormControl>
        <Divider variant="middle" />

        <div className={classes.dualForm}>
          <FormControl className={classes.form2}>
            <div className={classes.optionalTagBox}>
              <Typography className={classes.inputHeader2}>Recipient Details </Typography>
              <PeopleIcon className={classes.header2Icons} />
            </div>
            <Select
              className={classes.dualSelect}
              labelId="name"
              placeholder="Name"
              value="default"
              variant="outlined"
            >
              <MenuItem value="default"> Select Name</MenuItem>{" "}
              {/* NEED TO DYNAMICALLY SET NAMES */}
            </Select>
            <br />
            <TextField
              variant="outlined"
              className={classes.dualText}
              labelId="phone"
              placeholder="Enter Phone Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon style={{ color: "#3739B5" }} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl className={classes.form2}>
            <div className={classes.optionalTagBox}>
              <Typography className={classes.inputHeader2}>Volunteer Details </Typography>
              <PanToolIcon className={classes.header2Icons} style={{ fontSize: "large" }} />
              <Typography className={classes.optionalTag2}> - optional</Typography>
            </div>
            <Select
              className={classes.dualSelect}
              labelId="name0"
              placeholder="Name"
              value="default"
              variant="outlined"
            >
              <MenuItem value="default"> Select Name</MenuItem>{" "}
              {/* NEED TO DYNAMICALLY SET NAMES */}
            </Select>
            <br />
            <TextField
              variant="outlined"
              className={classes.dualText}
              labelId="phone0"
              placeholder="Enter Phone Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon style={{ color: "#3739B5" }} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </div>

        <Divider variant="middle" />
        <div className={classes.dualForm}>
          <FormControl className={classes.form2}>
            <Typography className={classes.inputHeader2}>Drop Off Details </Typography>
            <TextField
              className={classes.dualText}
              variant="outlined"
              labelId="location"
              placeholder="Enter Address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddLocationIcon style={{ color: "#3739B5" }} />
                  </InputAdornment>
                ),
              }}
            />{" "}
            {/** NEED TO RUN ADDRESS SEARCH ON THESE TO STORE THE LOCATION IN THE BACKEND */}
            <br />
            <TextField
              type="date"
              className={classes.dualText}
              variant="outlined"
              labelId="dod"
              placeholder="Enter Drop Off Date Date "
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <QueryBuilderIcon style={{ color: "#3739B5" }} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl className={classes.form2}>
            <Typography className={classes.inputHeader2}>Pick Up Details </Typography>
            <TextField
              className={classes.dualText}
              variant="outlined"
              labelId="address"
              placeholder="Enter Address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddLocationIcon style={{ color: "#3739B5" }} />
                  </InputAdornment>
                ),
              }}
            />{" "}
            {/** NEED TO RUN ADDRESS SEARCH ON THESE TO STORE THE LOCATION IN THE BACKEND */}
            <br />
            <TextField
              type="date"
              className={classes.dualText}
              variant="outlined"
              labelId="pud"
              placeholder="Enter Pick Up Date Date"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <QueryBuilderIcon style={{ color: "#3739B5" }} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </div>
        <Divider variant="middle" />

        <div className={classes.optionalTagBox}>
          <Typography className={classes.inputHeader2}>Drop Off Instructions / Comments</Typography>
          <Typography className={classes.optionalTag2}> - optional</Typography>
        </div>
        <TextField
          className={classes.bigTextField}
          variant="outlined"
          placeholder="Enter any notes or comments about this mission here."
          multiline
        ></TextField>
        <Button className={classes.button}>Create Mission</Button>
      </Typography>
    </Container>
  );
};

export default CreateMission;
