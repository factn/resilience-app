import {
  MissionInterface,
  MissionStatus,
  MissionType,
  MissionFundedStatus,
  MissionPayableStatus,
  MissionDetails,
  Location,
} from "./schema";
import { merge, sanatize } from "./util/dataObjectUtil";

const defaultLocation: Location = {
  address: "",
  lat: 0,
  long: 0,
  label: "Location Label",
};

const defaultMissionDetails: MissionDetails = {};

const defaultMissionData: MissionInterface = {
  id: "123",
  type: MissionType.foodbox,
  status: MissionStatus.unassigned,
  fundedStatus: MissionFundedStatus.notfunded,
  payableStatus: MissionPayableStatus.notacquired,
  organisationId: "1234",
  tentativeVolunterId: "0", // this get removed if the volunteer accepts?
  volunteerId: "0",
  title: "Default Title",
  missionDetails: defaultMissionDetails, // varies by mission type
  description: "This is a description",
  image: "/",
  notes: "",
  privateNotes: "", // just for volunteer and organiser
  cost: 50.0, // Decimal if possible eg 12.21 (assume USD for MVP.0)
  pickUpWindow: null, // nb this can be an exact time or can be null
  pickUplocation: defaultLocation,
  deliveryWindow: null,
  deliverylocation: defaultLocation, // default to recipient location
  deliveryConfirmationImage: "/",
  deliveryNotes: "Leave on door step",
  missionAccepted: false,
  feedbackNotes: "",
  recipientName: "Sally",
  recipientPhoneNumber: "777-777-7777",
  recipientId: "123", // reference?
  created: new Date(), // time stamp
  lastUpdated: new Date(), // time stamp
};

const Mission = {
  load: (data: unknown) => merge(data, defaultMissionData),
  sanatize: (data: unknown) => sanatize(data, defaultMissionData),
};

export default Mission;
