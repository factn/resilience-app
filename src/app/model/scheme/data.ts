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
  /*Unique Id of an organization, this create automatically*/
  readonly uid: OrganizationUID;
  /*Name of the organization */
  name: string;
  /*The Location of the Organization*/
  location: Location;  
}

/*Volunteer status when first signup to a organization*/
enum VolunteerPendingStatus {
  created="created", // when user first created an account
  // once user accept term and conditions -> pending
  pending="pending", // waiting for organization to approve the request
  // once the organization accept, -> approved
  // if not accepted -> declined
  approved="approved", // you are a volunteer
  declined="declined", // sorry
}

type UserUID = string;
// === USER ===
interface User {
  readonly uid: UserUID;
  /* phone number, our primary means of communication*/
  phone: number;
  /* user profile name, this populate from either user, or his provider*/
  profileName: string;
  /* user location, we use this to show user, (later on) which organization exist to signup to*/
  location: Location;
  /* the organization that user belong to*/
  organizationId: number;
  /* if user is a volunteer */
  isVolunteer: boolean;
  /* if user is an organizer */
  isOrganizer: boolean;
  /* specifict details for the volunteer */
  volunteerDetails: {
    /*if user have transportation */
    hasTransportation: boolean;
    /*user volunteering to an organization have a pending status*/
    pendingStatus: VolunteerPendingStatus;
    pendingDetail:{
      /*if user was declined, why, only for organizer*/
      privateNotes: string
    }
  };
  /* specifict details for the organizer*/
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
  endTime?: Date; // we could infer this from the other two but shall we store  anyway, I think its better to keep it small, but, maybe it will be used in the future
  // for more accuracy
}

type MissionUID = string;
interface Mission {
  uid: MissionUID;
  // the type of the mission, this might change the flow of the system
  type: MissionType;
  // status of the mission
  status: MissionStatus;
  fundedStatus: MissionFundedStatus;
  payableStatus: MissionPayableStatus;
  organisationId: OrganizationUID;
  tentativeVolunterId: string; //presumably this get removed if the volunteer accepts?
  volunteerId: string;
  details: {
    title: string;
    description: string;
    url: string;
    notes: string;
    privateNotes: string;
    cost: number;  // Miles, check this please
    pickUp: {
      date: Date; // can be null, // should we have timewindow here for consistency
      location: Location;
    };
    dropOff: {
      deliveryWindow: TimeWindow;
      location: Location; // default to recipient location
    };
    // when the mission are delivered, details of that
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
      recipientId: UserUID;
    };
  };

  missionlog: MissionLogEvent[];
}

interface MissionLogEvent {
  userId: UserUID;
  action: string;
  actionDetail: string;
  fieldName: string;
  newValue: any;
  timestamp: Date;
}

//eg

const exampleLog = [
  {
    userId: "_a121asdfa",
    action: "created",
    timestamp: 12324322,
  },
  {
    userId: "_a121asdfa",
    action: "updated",
    timestamp: 12329322,
    field: "description",
    newvalue: "go pick up xyz",
  },

  {
    userId: "_a121asdfa",
    action: "moved to tentatve",
    timestamp: 12329322,
  },
];