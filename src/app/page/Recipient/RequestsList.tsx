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
  fallback: {
    marginTop: "2rem",
  },
  confirmationImage: {
    width: "calc(100% - 4rem)",
    margin: "1rem 2rem",
  },
  volunteerName: {
    display: "flex",
    margin: "auto",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiAvatar-root": {
      margin: "0 .5rem",
    },
  },
}));

type Props = {
  missions: MissionInterface[];
  fallback: string;
};

export default function ({ fallback, missions }: Props) {
  const classes = useStyles();

  if (missions.length < 1) {
    return (
      <Typography className={classes.fallback} align="center" variant="body1" color="textSecondary">
        {fallback}
      </Typography>
    );
  }

  return (
    <>
      {missions.map((mission) => (
        <RecipientMissionCard key={mission.uid} mission={mission} />
      ))}
    </>
  );
}

function RecipientMissionCard({ mission }: { mission: MissionInterface }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <Card className={classes.card}>
      <TopBar
        status={mission.status}
        fundedStatus={mission.fundedStatus}
        createdDate={mission.createdDate}
      />
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
  );
}

type TopBarProps = {
  status: Status;
  fundedStatus: FundedStatus;
  createdDate: string;
  className?: string;
};

function Icon({ fundedStatus, status, ...rest }: any) {
  if (status === Status.started) return <PlayCircleFilled {...rest} />;
  if (status === Status.delivered) return <NotificationImportant {...rest} />;
  if (status === Status.succeeded) return <CheckCircle {...rest} />;
  if (fundedStatus === FundedStatus.notfunded) return <HourglassFull {...rest} />;
  return <FiberNew {...rest} />;
}

function TopBarText({ createdDate, fundedStatus, status }: any): any {
  const date = new Date(createdDate).toLocaleDateString();

  if (status === Status.started) return `In progress | Accepted`;
  if (status === Status.delivered) return `It's here! Confirm delivery below`;
  if (status === Status.succeeded) return `Delivery Confirmed`;
  if (fundedStatus === FundedStatus.notfunded) return `Awaiting donation | Submitted ${date}`;
  return `Submitted ${date}`;
}

function _TopBar({ className, ...rest }: TopBarProps) {
  // TODO we need a `lastUpdated` date to use for the other statuses
  return (
    <div className={className}>
      <Typography color="primary" variant="h5">
        <Icon {...rest} color="primary" />
        <TopBarText {...rest} />
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
  const classes = useStyles();
  return (
    <>
      <Divider />
      <Box margin="1rem" textAlign="center">
        <Typography variant="h5">Your request has been delivered!</Typography>
        <img
          className={classes.confirmationImage}
          src={mission.deliveryConfirmationImage}
          alt="Confirmation"
        />
        <Typography className={classes.volunteerName}>
          By <Avatar alt="volunteer avatar" src={mission.volunteerPhotoURL} />{" "}
          {mission.volunteerDisplayName}
        </Typography>
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
