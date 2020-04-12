#!/usr/bin/env node
// @ts-nocheck
import path from "path"

interface Location {
  /* The address represent the location */
  address: string;
  /* Latitude */
  lat: number;
  /* Longtitude */
  long: number;
  /* When we want to declare more*/
  label: string;
}

type OrganizationUID = string;
// ===== Organization ====
interface Organization {
  /* unique id of the organ */
  readonly uid: OrganizationUID;
  name: string;
  location: Location;
  searchUser: () => User;
}

// === USER ===
interface User {
  readonly uid: string;
  phone: number;
  name: string;
  location: Location;
  organizationId: number;
  isVolunteer: boolean;
  isOrganizer: boolean;
  volunteerDetails: {
    hasCar: boolean;
  };
  organizerDetails: {};
}

//===== Mission =====//
enum MissionStatus {
  unassigned = "unassigned",
  tentative = "tentative",
  assigned = "assigned",
  started = "started",
  delivered = "delivered",
  done = "done",
}

enum MissionFundedStatus {
  notfunded = "fundingnotneeded",
  fundedbyrecipient = "fundedbyrecipient",
  fundedinkind = "fundedinkind",
  fundingnotneeded = "fundingnotneeded",
  fundedbydonation = "fundedbydonation",
}

enum MissionPayableStatus {
  notacquired = "notacquired",
  readyforpickup = "readyforpickup",
}

enum MissionType {
  foodbox = "foodbox",
  pharmacy = "pharmacy",
  errand = "errand",
}
// grocery (with shopping list), readytoeat etc are types that may be added later

enum TimeWindowType {
  morning = "morning",
  afternoon = "afternoon",
  day = "wholeday",
  asap = "asap",
}

interface TimeWindow {
  timeWindowType: TimeWindowType;
  startTime: Date;
  endTime: Date; // we could infer this from the other two but shall we store  anyway, I think its better to keep it small, but, maybe it will be used in the future
  // for more accuracy
}

interface Mission {
  uid: string;
  type: MissionType;
  status: MissionStatus;
  fundedStatus: MissionFundedStatus;
  payableStatus: MissionPayableStatus;
  organisationId: OrganizationUID; //Organization.uid
  tentativeVolunterId: string; //presumably this get removed if the volunteer accepts?
  volunteerId: string;
  details: {
    title: string;
    description: string;
    url: string;
    notes: string;
    privateNotes: string;
    pickUp: {
      date: Date; // can be null, also timewindow?
      location: Location;
    };
    dropOff: {
      deliveryWindow: TimeWindow;
      location: Location; // default to recipient location
    };
    deliveryConfirmation: {
      imageUrl: string;
      deliveryNotes: string;
    };
    feedback: {
      missionAccepted: boolean;
      notes: string;
    };
    recipient: {
      name?: string; //  only include if recipientId  not available
      contactNumber?: string; // only include if recipientId  not available
      recipientId: string;
    };
  };

  missionlog: MissionLogEvent[];
}

interface MissionLogEvent {
  userId: string;
  action: string;
  actionDetail: string;
  fieldName: string;
  newValue: any;
  timestamp: Date;
}

