export type ImageUrl = string;

export interface Location {
  /* The address represent the location - parseable by geolocation */
  address: string;
  /* Latitude */
  lat: number;
  /* Longtitude */
  lng: number;
  /*  eg Pepperige farms if relevant */
  label: string;
}

// ===== Organization ====
export class Organization {
  /* Firebase Id, created automatically*/
  id!: string;
  /*Name of the organization */
  name!: string;
  /*The Location of the Organization*/
  location?: Location;
  localTimeZone?: string;
  // bounding box?
  // list of available foodboxes ..
  // list of available deliveryWindows ...
}

// === USER ===

/*Volunteer status when first signup to a organization*/
export enum VolunteerStatus {
  created = "created", // when user first created an account
  // once user accept term and conditions -> pending
  pending = "pending", // waiting for organization to approve the request
  // once the organization accept, -> approved
  // if not accepted -> declined
  approved = "approved", // you are a volunteer
  declined = "declined", // sorry
}

export class UserInterface {
  id!: string;
  /* phone number, our primary means of communication
  FIXME: need to ensure this is synced from firebase.auth ph number
  FIXME: where do we assert phone number formatting?
  FIXME: currently, always null */
  phone?: number;
  /* user's selected profile image url
  FIXME: need to sync this with state.firebase.profile.photoURL ?
  */
  photoURL?: ImageUrl;
  /* user profile name, this populate from either user, or his provider*/
  displayName?: string;
  /* user location, we use this to show user on a map */
  location?: Location;
  /* the organization that user belong to*/
  organizationId!: number;
  /* if user is a volunteer */
  isVolunteer!: boolean;
  /* if user is an organizer */
  isOrganizer!: boolean;
  /* specific details for the volunteer */
  volunteerDetails!: {
    /*if user have transportation */
    hasTransportation: boolean;
    /*user volunteering to an organization have a pending status*/
    status: VolunteerStatus;
    privateNotes: string;
  };
  /* specific details for the organizer*/
  organizerDetails!: {};
}

//===== Mission =====//
export enum MissionStatus {
  unassigned = "unassigned",
  tentative = "tentative",
  assigned = "assigned",
  started = "started",
  delivered = "delivered",
  done = "done",
}

export enum MissionFundedStatus {
  notfunded = "notfunded",
  fundedbyrecipient = "fundedbyrecipient",
  fundedinkind = "fundedinkind",
  fundingnotneeded = "fundingnotneeded",
  fundedbydonation = "fundedbydonation",
}

export enum MissionPayableStatus {
  notacquired = "notacquired",
  readyforpickup = "readyforpickup",
}

export enum MissionType {
  foodbox = "foodbox",
  pharmacy = "pharmacy",
  errand = "errand",
}

export interface MissionDetails {}

export interface FoodBoxDetails extends MissionDetails {
  boxes?: Array<FoodBox>; // if multple boxes of same type grouping can occur in the UI
}

// created by the organiser.. but for MVP.0 we *hard code* a list of one type of box
// @Collection("foodboxes")
export interface FoodBox {
  id: string;
  name?: string;
  cost?: number;
  description?: string;
}

export enum TimeWindowType {
  exact = "exact", //exact time specfied
  morning = "morning",
  afternoon = "afternoon",
  wholeday = "wholeday",
  asap = "as soon as possible",
  whenever = "whenever possible",
}

// delivery windows for the organisation
// for MVP.0 we have a fixed function ie hardcode a list of available delivery windows

export interface TimeWindow {
  timeWindowType: TimeWindowType;
  startTime: Date; // actually date time
}

export interface MissionLogEvent {
  id: string;
  actorId: string;
  action: string;
  actionDetail?: string;
  fieldName?: string;
  newValue: any;
  timestamp: Date;
}

export interface MissionInterface {
  id: string;
  type: MissionType;
  status: MissionStatus;
  fundedStatus: MissionFundedStatus;
  payableStatus: MissionPayableStatus;
  organisationId: string;
  tentativeVolunterId: string; // this get removed if the volunteer accepts?
  volunteerId: string;
  title: string;
  missionDetails: MissionDetails; // varies by mission type
  description: string;
  image: ImageUrl;
  notes: string;
  privateNotes: string; // just for volunteer and organiser
  cost: number; // Decimal if possible eg 12.21 (assume USD for MVP.0)
  pickUpWindow: TimeWindow | null; // nb this can be an exact time or can be null
  pickUplocation: Location;
  deliveryWindow: TimeWindow | null;
  deliveryLocation: Location; // default to recipient location
  deliveryConfirmationImage: ImageUrl;
  deliveryNotes: string;
  missionAccepted: boolean;
  feedbackNotes: string;
  recipientName: string;
  recipientPhoneNumber: string;
  recipientId: string; // reference?
  created: Date; // time stamp
  lastUpdated: Date; // time stamp
  // all other event log type stuff, such as when assigned etc belongs in the eventlog
  // this should be a child collection
  //@SubCollection(MissionLogEvent)
  //eventlog?: ISubCollection<MissionLogEvent>;
}
