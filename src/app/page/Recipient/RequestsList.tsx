import React, { useState } from "react";
import {
  Card,
  CardHeader,
  makeStyles,
  Typography,
  CardActionArea,
  CardActions,
  Collapse,
  Button,
  Box,
  Divider,
} from "@material-ui/core";
import { FiberNew, PlayCircleFilled, NotificationImportant, CheckCircle } from "@material-ui/icons";
import styled from "styled-components";

import {
  MissionInterface,
  MissionStatus as Status,
  MissionFundedStatus as FundedStatus,
} from "../../model/schema";
import { useOrganization } from "../../model";
import { ReactComponent as AppleIcon } from "../../../img/apple.svg";

type Props = {
  missions: MissionInterface[];
};

export default function ({ missions }: Props) {
  console.log(missions);
  return missions.map((mission) => <RecipientMissionCard key={mission.uid} mission={mission} />);
}

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "1rem 0",
  },
  appleIcon: {
    marginTop: ".5rem",
    height: "1.5rem",
    width: "1.5rem",
  },
  cardHeader: {
    alignItems: "end",
  },
  cardActions: {
    justifyContent: "center",
  },
}));

function RecipientMissionCard({ mission }: { mission: MissionInterface }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const toggle = () => setOpen(!open);

  return (
    <>
      <Card className={classes.card}>
        <TopBar
          status={mission.status}
          fundedStatus={mission.fundedStatus}
          createdDate={mission.createdDate}
        ></TopBar>
        <CardActionArea onClick={toggle}>
          <CardHeader
            className={classes.cardHeader}
            avatar={<AppleIcon className={classes.appleIcon} />}
            title={<Typography variant="h4">FOOD BOX DELIVERY</Typography>}
            subheader={mission.details?.map((r) => (
              <Typography key={r.resourceUid} variant="subtitle2">
                {r.quantity} x {r.displayName}
              </Typography>
            ))}
          />
        </CardActionArea>
        <Collapse in={open}>
          <Details mission={mission} />
        </Collapse>
        <CardActions className={classes.cardActions}>
          <Button onClick={toggle} color="primary" size="small">
            {open ? "HIDE DETAILS" : "MORE DETAILS"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

type TopBarProps = {
  status: Status;
  fundedStatus: FundedStatus;
  createdDate: string;
  className?: string;
};

function Icon({ status, ...rest }: any) {
  return status === Status.started ? (
    <PlayCircleFilled {...rest} />
  ) : status === Status.delivered ? (
    <NotificationImportant {...rest} />
  ) : status === Status.succeeded ? (
    <CheckCircle {...rest} />
  ) : (
    <FiberNew {...rest} />
  );
}

function _TopBar({ className, createdDate, status }: TopBarProps) {
  const date = new Date(createdDate).toLocaleDateString();

  return (
    <div className={className}>
      <Typography color="primary" variant="h5">
        <Icon status={status} color="primary" />
        {status === Status.started ? (
          <>In progress | Accepted {date}</>
        ) : status === Status.delivered ? (
          <>It's here! Confirm delivery below</>
        ) : status === Status.succeeded ? (
          <>Delivery Confirmed | {date}</>
        ) : (
          <>Submitted {date}</>
        )}
      </Typography>
    </div>
  );
}

const TopBar = styled(_TopBar)`
  background-color: ${(props) => {
    switch (props.status) {
      case Status.started:
        return props.theme.color.secondaryBlue;
      case Status.delivered:
      case Status.succeeded:
        return props.theme.color.greenLight;
      default:
        return props.theme.color.lightgrey;
    }
  }};

  border-radius: 4px 4px 0 0;
  padding: 0.5rem 1rem;

  h5 {
    display: flex;
  }
  svg {
    margin-right: 0.5rem;
  }
`;

const EditLink = styled(Button)`
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: underline;
  font-weight: 300;
`;

function Details({ mission }: { mission: MissionInterface }) {
  const org = useOrganization();
  return (
    <>
      <Divider />
      <Box margin="1rem 2rem">
        <Typography variant="h5" color="textPrimary">
          Address
        </Typography>
        <Typography variant="body1" gutterBottom>
          {mission.deliveryLocation.address}
        </Typography>
        <Box display="flex">
          <Typography variant="h5" color="textPrimary">
            Drop-off instructions
          </Typography>
          <EditLink onClick={() => {}}>Edit</EditLink>
        </Box>
        <Typography variant="body1">{mission.deliveryNotes}</Typography>
        {/* <Typography variant="h5" color="textPrimary">
          Total Cost
        </Typography>
        <Typography variant="body1" gutterBottom>
          {mission.deliveryLocation.address}
        </Typography> */}
        {/* <Typography variant="h5" color="textPrimary">
          Need Help?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Contact you organizer at {org.phoneNumber}
        </Typography> */}
      </Box>
    </>
  );
}
