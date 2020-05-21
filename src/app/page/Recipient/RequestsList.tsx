import React, { useState } from "react";
import {
  Card,
  CardHeader,
  makeStyles,
  Typography,
  CardActionArea,
  Collapse,
  Button,
  Box,
  Divider,
  Avatar,
} from "@material-ui/core";
import {
  FiberNew,
  PlayCircleFilled,
  NotificationImportant,
  CheckCircle,
  HourglassFull,
} from "@material-ui/icons";
import styled from "styled-components";

import {
  MissionInterface,
  MissionStatus as Status,
  MissionFundedStatus as FundedStatus,
} from "../../model/schema";
import { ReactComponent as AppleIcon } from "../../../img/apple.svg";

import Details from "./Details";

type Props = {
  missions: MissionInterface[];
};

export default function ({ missions }: Props) {
  return (
    <>
      {missions.map((mission) => (
        <RecipientMissionCard key={mission.uid} mission={mission} />
      ))}
    </>
  );
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
  cardBottomToggle: {
    padding: ".5rem",
    "& p": {
      fontWeight: "600",
      fontSize: ".8rem",
    },
  },
}));

function RecipientMissionCard({ mission }: { mission: MissionInterface }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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
          {mission.status === Status.delivered && <ConfirmDelivery mission={mission} />}
        </Collapse>
        <CardActionArea onClick={toggle} className={classes.cardBottomToggle}>
          <Typography align="center" color="primary">
            {open ? "HIDE DETAILS" : "MORE DETAILS"}
          </Typography>
        </CardActionArea>
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

function Icon({ fundedStatus, status, ...rest }: any) {
  return status === Status.started ? (
    <PlayCircleFilled {...rest} />
  ) : status === Status.delivered ? (
    <NotificationImportant {...rest} />
  ) : status === Status.succeeded ? (
    <CheckCircle {...rest} />
  ) : fundedStatus === FundedStatus.fundedbydonation ? (
    <HourglassFull {...rest} />
  ) : (
    <FiberNew {...rest} />
  );
}

function _TopBar({ className, createdDate, fundedStatus, status }: TopBarProps) {
  const date = new Date(createdDate).toLocaleDateString();

  // TODO we need a `lastUpdated` date to use for the other statuses
  return (
    <div className={className}>
      <Typography color="primary" variant="h5">
        <Icon status={status} fundedStatus={fundedStatus} color="primary" />
        {status === Status.started ? (
          <>In progress | Accepted</>
        ) : status === Status.delivered ? (
          <>It's here! Confirm delivery below</>
        ) : status === Status.succeeded ? (
          <>Delivery Confirmed</>
        ) : fundedStatus === FundedStatus.fundedbydonation ? (
          <>Awating donation | Submitted {date}</>
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

function ConfirmDelivery({ mission }: { mission: MissionInterface }) {
  return (
    <>
      <Divider />
      <Box margin="1rem" textAlign="center">
        <Typography variant="h5">Your request has been delivered!</Typography>
        <img src={mission.deliveryConfirmationImage} alt="Confirmation" />
        {/* 
        TODO we should probably include the volunteer avatar with the mission */}
        <Typography>By {mission.volunteerDisplayName}</Typography>
        {/* 
         TODO need a delivered date/ date updated */}
        {/* <Typography> on {_some_date_here}</Typography> */}

        <Button
          style={{ marginTop: "1rem" }}
          variant="contained"
          startIcon={<CheckCircle />}
          color="primary"
        >
          Confirm Delivery
        </Button>
      </Box>
    </>
  );
}
