import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Mission } from "../../model";
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
    width: "50%",
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
  inputLabel: {
    fontSize: "20px",
  },
  menuItem: {
    display: "flex",
  },
}));

const CreateMission = () => {
  const classes = useStyles();
  const [missionType, setMissionType] = useState();
  const [items, setItems] = useState();
  const [missionFund, setMissionFund] = useState(1);
  const [recipient, setRecipient] = useState({ name: "default", phoneNumber: "" });
  const [volunteer, setVolunteer] = useState({ name: "default", phoneNumber: "" });
  const [dropOff, setDropOff] = useState({ address: "", date: "" });
  const [pickUp, setPickUp] = useState({ address: "", date: "" });
  const [comment, setComment] = useState("");
  // master mission object
  const [newMissionObject, setNewMissionObject] = useState({});

  // master submit
  async function submitMission(e) {
    e.preventDefault();
    setNewMissionObject({
      missionId: uuidv4(),
      createdAt: new Date(),
      createdBy: "organizer", // make dynamic
      missionType: missionType,
      associatedItems: items,
      fund: missionFund,
      recipient: recipient,
      volunteer: volunteer,
      dropOff: dropOff,
      pickUp: pickUp,
      comment: comment,
    });
    try {
      const createdMission = await Mission.create(newMissionObject);
      console.log(createdMission);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ERROR",
        payload: "There was an error creating your mission. Please contact the organization.",
      });
    }
  }
  // Functions for changing the states
  const handleChangeMissionType = (event) => {
    setMissionType(event.target.value);
  };

  const handleChangeFund = (event) => {
    setMissionFund(event.target.value);
  };

  const handleRecipient = (event) => {
    setRecipient({ ...recipient, [event.target.name]: event.target.value });
  };

  const handleVolunteer = (event) => {
    setVolunteer({ ...volunteer, [event.target.name]: event.target.value });
  };

  const handleDrop = (event) => {
    setDropOff({ ...dropOff, [event.target.name]: event.target.value });
  };

  const handlePickUp = (event) => {
    setPickUp({ ...pickUp, [event.target.name]: event.target.value });
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleItems = (event) => {
    setItems({ ...items, [event.target.name]: event.target.value });
    console.log(items);
  };

  // This handles all the food box inputs that are added to food box missions
  const [foodBoxArray, setFoodBoxArray] = useState([]);
  function addToFBCount() {
    setFoodBoxArray([...foodBoxArray, foodBoxArray.length]);
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
          <InputLabel
            variant="outlined"
            id="missionType"
            shrink={true}
            className={classes.inputLabel}
          >
            Select Mission Type
          </InputLabel>
          <Select
            labelid="missionType"
            variant="outlined"
            className={classes.select}
            value={missionType}
            onChange={handleChangeMissionType}
          >
            <MenuItem className={classes.menuItem} value="food-box">
              Food box
            </MenuItem>
          </Select>
        </FormControl>
        {/* THIS PART SPAWNS BASED ON WHAT MISSION TYPE WAS SELECTED */}
        {missionType === "food-box" ? (
          <>
            <Typography className={classes.inputHeader}>Select Food Box Options</Typography>
            <FormControl className={classes.form}>
              {Object.keys(foodBoxArray).map((index) => {
                const { name, amount } = foodBoxArray[index];
                return (
                  <div className={classes.sideBySideSelect} key={index}>
                    <Select
                      onChange={handleItems}
                      name={"item for box " + index}
                      variant="outlined"
                      className={classes.select}
                      value={name}
                    >
                      <MenuItem value="Fruits and Veggies">Fruits & Veggies</MenuItem>
                      <MenuItem value="Non-Perishables">Non-Perishables</MenuItem>
                      <MenuItem value="Meat">Meat</MenuItem>
                    </Select>
                    <TextField
                      onChange={handleItems}
                      name={"amount for box " + index}
                      type="number"
                      variant="outlined"
                      className={classes.numSelector}
                      value={amount}
                    />
                  </div>
                );
              })}
              ;
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
            value={missionFund}
            onChange={handleChangeFund}
            startAdornment={
              <InputAdornment position="start">
                <AttachMoneyIcon style={{ color: "#3739B5" }} />
              </InputAdornment>
            }
          >
            {/* THIS WILL HAVE TO HAVE A DYNAMIC INITIAL VALUE */}
            <MenuItem className={classes.menuItem} value="Not yet funded">
              Not yet funded
            </MenuItem>
            <MenuItem className={classes.menuItem} value="Funded">
              Funded
            </MenuItem>
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
              labelid="name"
              placeholder="Name"
              value={recipient.name}
              variant="outlined"
              name="name"
              onChange={handleRecipient}
            >
              <MenuItem className={classes.menuItem} value="default">
                Select Recipient
              </MenuItem>
              {/* NEED TO DYNAMICALLY SET NAMES */}
            </Select>
            <br />
            <TextField
              variant="outlined"
              name="phoneNumber"
              onChange={handleRecipient}
              className={classes.dualText}
              value={recipient.phoneNumber}
              labelid="phone"
              placeholder="(123) 456-7890"
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
              labelid="name0"
              name="name"
              variant="outlined"
              onChange={handleVolunteer}
              value={volunteer.name}
            >
              <MenuItem className={classes.menuItem} value="default">
                Select Volunteer
              </MenuItem>
              {/* NEED TO DYNAMICALLY SET NAMES */}
            </Select>
            <br />
            <TextField
              variant="outlined"
              name="phoneNumber"
              className={classes.dualText}
              labelid="phone0"
              placeholder="(123) 456-7890"
              onChange={handleVolunteer}
              value={volunteer.phoneNumber}
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
              onChange={handleDrop}
              labelid="location"
              value={dropOff.address}
              name="address"
              placeholder="Enter Address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddLocationIcon style={{ color: "#3739B5" }} />
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <TextField
              type="date"
              className={classes.dualText}
              variant="outlined"
              labelid="dod"
              name="date"
              value={dropOff.date}
              onChange={handleDrop}
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
              name="address"
              value={pickUp.address}
              onChange={handlePickUp}
              labelid="address"
              placeholder="Enter Address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddLocationIcon style={{ color: "#3739B5" }} />
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <TextField
              type="date"
              className={classes.dualText}
              value={pickUp.date}
              onChange={handlePickUp}
              name="date"
              variant="outlined"
              labelid="pud"
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
          value={comment}
          onChange={handleComment}
          name="comment"
          placeholder="Enter any notes or comments about this mission here."
          multiline
        ></TextField>
        <Button className={classes.button} onClick={(e) => submitMission(e)}>
          Create Mission
        </Button>
      </Typography>
    </Container>
  );
};

export default CreateMission;
