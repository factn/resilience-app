import React from "react";
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

const useStyles = makeStyles((theme) => ({
  addMissionContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "15px 25px",
    position: "absolute",
    width: "721px",
    left: "143px",
    top: "132px",
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
  },
  inputHeader: {},
  input: {},
  form: {
    padding: "10px",
  },
  optionalTag: {},
  dualForm: {
    display: "flex",
  },
  inputHeader2: {},
  bigTextField: {},
  button: {},
}));

const CreateMission = () => {
  const classes = useStyles();
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
          <InputLabel id="smt">Select Mission Type</InputLabel>
          <Select className={classes.input} labelId="smt">
            <MenuItem value="foodBox">Food Box</MenuItem>
          </Select>
        </FormControl>
        <Divider variant="middle" />
        <Typography className={classes.inputHeader}>Funding Details </Typography>
        <Typography className={classes.optionalTag}>- optional</Typography>
        <FormControl className={classes.form}>
          <InputLabel id="fd">Not Funded Yet</InputLabel>
          <Select className={classes.input} labelId="fd">
            <MenuItem value={0}>Needs Funding</MenuItem>
          </Select>
        </FormControl>
        <Divider variant="middle" />
        <div className={classes.dualForm}>
          <FormControl className={classes.form}>
            <Typography className={classes.inputHeader2}>Recipient Details </Typography>
            <InputLabel id="name">Name</InputLabel>
            <TextField labelId="name" placeholder="Name" />
            <br />
            <InputLabel id="phone">Phone</InputLabel>
            <TextField labelId="phone" placeholder="Enter Phone Number" />
          </FormControl>
          <FormControl className={classes.form}>
            <Typography className={classes.inputHeader2}>Volunteer Details </Typography>
            <Typography className={classes.optionalTag}>- optional</Typography>
            <InputLabel id="name0">Name</InputLabel>
            <TextField labelId="name0" placeholder="Name" />
            <br />
            <InputLabel id="phone0">Phone</InputLabel>
            <TextField labelId="phone0" placeholder="Enter Phone Number" />
          </FormControl>
        </div>
        <Divider variant="middle" />
        <div className={classes.dualForm}>
          <FormControl className={classes.form}>
            <Typography className={classes.inputHeader2}>Drop Off Details </Typography>
            <InputLabel id="location">Address</InputLabel>
            <TextField labelId="location" placeholder="Enter Address" />
            <br />
            <InputLabel id="dod">Drop Off Date</InputLabel>
            <TextField labelId="dod" placeholder="Enter Date" />
          </FormControl>
          <FormControl className={classes.form}>
            <Typography className={classes.inputHeader2}>Pick Up Details </Typography>
            <InputLabel id="address">Address</InputLabel>
            <TextField labelId="address" placeholder="Enter Location" />
            <br />
            <InputLabel id="pud">Pick Up Date</InputLabel>
            <TextField labelId="pud" placeholder="Enter Date" />
          </FormControl>
        </div>
        <Divider variant="middle" />
        <Typography className={classes.inputHeader2}>Drop Off Instructions / Comments</Typography>
        <Typography className={classes.optionalTag}>- optional</Typography>
        <TextField className={classes.bigTextField} multiline></TextField>
        <Button className={classes.button}>Create Mission</Button>
      </Typography>
    </Container>
  );
};

export default CreateMission;
