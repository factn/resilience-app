import React, { ReactNode, useState, useContext } from "react";
import { Typography, Button, Box, Divider, TextField } from "@material-ui/core";
import styled from "styled-components";

import Snackbar from "../../component/Snackbars";
import { MissionInterface, MissionStatus as Status } from "../../model/schema";
import { Mission, useOrganization } from "../../model";

export default function Details({ mission }: { mission: MissionInterface }) {
  const org = useOrganization();
  return (
    <>
      <Divider />
      <Box margin="1rem">
        {mission.deliveryType === "delivery" ? (
          <>
            <DetailSection
              header="Address"
              content={
                <Typography variant="body1" gutterBottom>
                  {mission.deliveryLocation.address}
                </Typography>
              }
            />
            <DropOffInstructions mission={mission} />
          </>
        ) : (
          <>
            <DetailSection
              header="Pick Up Location"
              content={
                <>
                  <Typography variant="body1">{org?.location?.label}</Typography>
                  <Typography variant="body1">{org?.location?.address}</Typography>
                </>
              }
            />
            <DetailSection
              header="Pick Up Time"
              content={
                <Typography variant="body1">Sunday morning between 8:00am–11:00am</Typography>
              }
            />
          </>
        )}
        {org?.contactPhoneNumber && (
          <DetailSection
            header="Need Help?"
            content={
              <Typography variant="body1" gutterBottom>
                Contact your organizer at{" "}
                <a href={`tel:${org?.contactPhoneNumber}`}>{org?.contactPhoneNumber}</a>
              </Typography>
            }
          />
        )}
      </Box>
    </>
  );
}

function DetailSection({ content, header }: { content: ReactNode; header: ReactNode }) {
  return (
    <Box marginBottom="1rem">
      {React.isValidElement(header) ? header : <Typography variant="h5">{header}</Typography>}
      <Box>{content}</Box>
    </Box>
  );
}

function DropOffInstructions({ mission }: { mission: MissionInterface }) {
  const [isEditing, setIsEditing] = useState(false);
  const [deliveryNotes, setDeliveryNotes] = useState(mission.deliveryNotes);

  const snackbar: any = useContext(Snackbar.Context.SnackbarContext);

  function handleEdit() {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    Mission.update(mission.uid, { deliveryNotes })
      .then(() => {
        setIsEditing(false);
      })
      .catch((e) => {
        snackbar.show({
          message: `Unable to update instructions. Please contact organizer.`,
          type: "error",
        });
        setIsEditing(false);
        setDeliveryNotes(mission.deliveryNotes);
      });
  }

  return (
    <DetailSection
      header={
        <Box display="flex">
          <Typography variant="h5" color="textPrimary">
            Drop-off instructions
          </Typography>
          {![Status.delivered, Status.succeeded].includes(mission.status) && (
            <EditLink onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</EditLink>
          )}
        </Box>
      }
      content={
        isEditing ? (
          <TextField value={deliveryNotes} onChange={(e) => setDeliveryNotes(e.target.value)} />
        ) : deliveryNotes ? (
          <Typography variant="body1">{deliveryNotes}</Typography>
        ) : (
          <em>
            <Typography variant="subtitle1" color="textSecondary">
              No instructions specified
            </Typography>
          </em>
        )
      }
    />
  );
}

const EditLink = styled(Button)`
  background: none;
  border: none;
  min-width: 0;
  margin-left: 0.5rem;
  padding: 0 5px;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: underline;
  font-weight: 300;
`;
