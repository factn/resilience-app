import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "50%",
  },
  sideBySideSelect: {
    display: "flex",
    margin: "10px",
  },
  numSelector: {
    width: "100px",
    marginLeft: "20px",
  },
  selectCreateButton: {
    textAlign: "left",
    padding: "10px",
    color: "#3739B5",
    maxWidth: "50%",
  },
  inputHeader: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
    padding: "5px",
    marginBottom: "5px",
  },
  inputLabel: {
    fontSize: "20px",
  },
}));

export default function MissionTypeFormFB(props) {
  const classes = useStyles();

  const [items, setItems] = useState({
    name: "",
    amount: 0,
  });
  const handleItemChanges = (event) => {
    setItems({ ...items, name: event.target.value });
  };
  const handleItemChangesAmount = (event) => {
    setItems({ ...items, amount: event.target.value });
  };
  return (
    <div className={classes.sideBySideSelect}>
      <Select
        onChange={handleItemChanges}
        name={"item" + props.indexOf}
        variant="outlined"
        className={classes.select}
        value={items.name}
      >
        <MenuItem value="Fruits and Veggies">Fruits & Veggies</MenuItem>
        <MenuItem value="Non-Perishables">Non-Perishables</MenuItem>
        <MenuItem value="Meat">Meat</MenuItem>
      </Select>
      <TextField
        onChange={handleItemChangesAmount}
        name={"amount" + props.indexOf}
        type="number"
        variant="outlined"
        className={classes.numSelector}
        value={items.amount}
      />
    </div>
  );
}
