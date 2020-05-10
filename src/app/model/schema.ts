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

export interface DonationLog {
  amount: string;
  createdDate: string;
  method: string;
  recieptId: string;
  donorName: string;
  donorEmail: string;
}

export class Resource {
  uid!: string;
  name!: string;
  cost!: number;
  provider: string = "";
  fundedByRecipient: number = 0;
  fundedByDonation: number = 0;
  notFunded: number = 3;
  maxNumberRequestable: number = 50;
  acceptOrder: boolean = false;
  description: string = "";
}

export interface PaymentSettings {
  clientUid: string;
  email: string;
}

// ===== Organization ====
export class OrganizationInterface {
  /* Firebase Id, created automatically*/
  uid!: string;
  /*Name of the organization */
  name!: string;
  /*The Location of the Organization*/
  location?: Location;
  phoneNumber!: string;
  EINNumber?: string;
  /**
   * There are subcollection, they are here for references
  resources?: Map<string, Resource>;
  missions: Map<string, MissionInterface> = new Map();
  users: Map<string, UserInterface> = new Map();
  paymentSettings
  */
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
  uid!: string;
  phoneNumber?: string;
  email?: string;
  /* user's selected profile image url
   */
  photoURL?: ImageUrl;
  /* user profile name, this populate from either user, or his provider*/
  displayName?: string;
  /* from the 'Tell us about yourself' form field */
  description?: string;
  /* user location, we use this to show user on a map */
  location?: Location;
  /* the organization that user belong to*/
  organizationUid!: number;
  /* if user is a volunteer */
  isVolunteer!: boolean;
  /* if user is an organizer */
  isOrganizer!: boolean;
  /* if user can receive texts */
  cannotReceiveTexts!: boolean;
  /* specific details for the volunteer */
  volunteerDetails!: {
    /*user hours */
    availability: string;
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

  succeeded = "succeeded",
  failed = "failed",
}

export enum MissionFundedStatus {
  notfunded = "notfunded",
  fundedbyrecipient = "fundedbyrecipient",
  fundedbydonation = "fundedbydonation",
  fundingnotneeded = "fundingnotneeded",
}

export enum MissionType {
  foodbox = "foodbox",
  pharmacy = "pharmacy",
  errand = "errand",
}

export enum TimeWindowType {
  exact = "exact", //exact time specfied
  morning = "morning",
  afternoon = "afternoon",
  wholeday = "wholeday",
  asap = "as soon as possible",
  whenever = "whenever possible",
}

// delivery windows for the organization
// for MVP.0 we have a fixed function ie hardcode a list of available delivery windows

export interface TimeWindow {
  timeWindowType: TimeWindowType;
  startTime: string; // actually date time
}

export interface MissionLogEvent {
  uid: string;
  actorUid: string;
  action: string;
  actionDetail?: string;
  fieldName?: string;
  newValue: any;
  timestamp: string;
}

export interface Box {
  name: string;
  quantity: number;
}

export interface FoodBoxDetails {
  needs: Array<Box>;
}

export interface MissionInterface {
  uid: string;
  type: MissionType;

  createdDate: string; // TODO should be a date?
  missionDetails: FoodBoxDetails | null;

  status: MissionStatus;
  fundedStatus: MissionFundedStatus;
  fundedDate: string | null;
  readyToStart: boolean;
  organizationUid: string;

  groupUid: string;
  groupDisplayName: string;

  tentativeVolunteerUid: string;
  tentativeVolunteerDisplayName: string;
  tentativeVolunteerPhoneNumber: string;

  volunteerUid: string;
  volunteerDisplayName: string;
  volunteerPhoneNumber: string;

  recipientUid: string; // reference?
  recipientDisplayName: string;
  recipientPhoneNumber: string;

  pickUpWindow: TimeWindow | null; // nb this can be an exact time or can be null
  pickUpLocation: Location;
  pickUpNotes: string;

  deliveryWindow: TimeWindow | null;
  deliveryLocation: Location; // default to recipient location
  deliveryConfirmationImage: ImageUrl;
  deliveryNotes: string;

  feedbackNotes: string;

  // all other event log type stuff, such as when assigned etc belongs in the eventlog
  // this should be a child collection
  //@SubCollection(MissionLogEvent)
  //eventlog?: ISubCollection<MissionLogEvent>;
}
