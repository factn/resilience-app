import React from "react";
import { Card, CardHeader, makeStyles, Typography } from "@material-ui/core";
import { FiberNew, PlayCircleFilled, NotificationImportant, CheckCircle } from "@material-ui/icons";
import styled from "styled-components";

import {
  MissionInterface,
  MissionStatus as Status,
  MissionFundedStatus as FundedStatus,
} from "../../model/schema";

type Props = {
  missions: MissionInterface[];
};

export default function ({ missions }: Props) {
  console.log(missions);
  return missions.map((mission) => <RecipientMissionCard key={mission.uid} mission={mission} />);
}

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "1rem",
  },
}));

function RecipientMissionCard({ mission }: { mission: MissionInterface }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <TopBar
          status={mission.status}
          fundedStatus={mission.fundedStatus}
          createdDate={mission.createdDate}
        ></TopBar>
        <CardHeader
          title={<Typography variant="h4">FOOD BOX DELIVERY</Typography>}
          subheader={mission.details}
        />
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
