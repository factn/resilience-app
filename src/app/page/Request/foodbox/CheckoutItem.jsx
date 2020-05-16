import React, { useState, useCallback } from "react";
import {
  makeStyles,
  Divider,
  ListItem,
  Select,
  RootRef,
  Box,
  Collapse,
  Typography,
  ListItemText,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import styled from "styled-components";

export const Expand = styled(ExpandMore)`
  align-self: center;

  ${(props) => props.open && `transform: rotate(180deg)`}
`;

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: "flex",
    alignItems: "start",
    justifyContent: "space-around",
    paddingLeft: "0",
  },
  cost: {
    flex: "none",
    width: "50px",
    textAlign: "right",
  },
  select: {
    marginRight: ".5rem",
  },
  quantity: {
    margin: "0 1rem",
  },
}));

// maximum allowable orders of a single resource
const MAX_ORDER = 5;

// The approximate width in the pixels of a single character
const CHAR_WIDTH = 7;

export default function CheckoutItem({ cost, description, name, onChange, quantity }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [width, setWidth] = useState(0);
  const ref = useCallback((node) => node && setWidth(node.offsetWidth), []);

  const crop = width / CHAR_WIDTH;
  const formatedDescription =
    description.length > crop ? description.slice(0, crop) + "..." : description;

  return (
    <>
      <Divider />
      <ListItem className={classes.listItem}>
        {onChange ? (
          <Select
            className={classes.select}
            native
            variant="outlined"
            value={quantity}
            onChange={onChange}
            inputProps={{
              name: "quantity",
              id: "quantity",
            }}
          >
            {[...Array(MAX_ORDER + 1)].map((e, i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </Select>
        ) : (
          <Typography className={classes.quantity} variant="h4">
            {quantity}
          </Typography>
        )}
        <RootRef rootRef={ref}>
          <Box onClick={() => setOpen(!open)} flex={1} display="flex" flexDirection="column">
            <Typography variant="h4" color="textPrimary">
              {name}
            </Typography>
            {!open && formatedDescription}
            <Collapse in={open} timeout={0}>
              {description}
            </Collapse>
            <Expand open={open} />
          </Box>
        </RootRef>
        <ListItemText className={classes.cost}>
          <Typography variant={onChange ? "h4" : "body1"} color="textPrimary">
            ${parseFloat(cost).toFixed(2)}
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
}
