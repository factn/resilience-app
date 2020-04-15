import {
  MissionInterface,
  MissionStatus,
  MissionType,
  MissionFundedStatus,
  MissionPayableStatus,
  MissionDetails,
  Location,
} from "./schema";
import { merge, sanitize } from "./util/dataObjectUtil";

const defaultLocation: Location = {
  address: "",
  lat: 0,
  long: 0,
  label: "Location Label",
};

const defaultMissionDetails: MissionDetails = {};

const defaultMissionData: MissionInterface = {
  id: "",
  type: MissionType.errand,
  status: MissionStatus.unassigned,
  fundedStatus: MissionFundedStatus.notfunded,
  payableStatus: MissionPayableStatus.notacquired,
  organisationId: "",
  tentativeVolunterId: "", // this get removed if the volunteer accepts?
  volunteerId: "",
  title: "",
  missionDetails: defaultMissionDetails, // varies by mission type
  description: "",
  image: "",
  notes: "",
  privateNotes: "", // just for volunteer and organiser
  cost: 50.0, // Decimal if possible eg 12.21 (assume USD for MVP.0)
  pickUpWindow: null, // nb this can be an exact time or can be null
  pickUplocation: defaultLocation,
  deliveryWindow: null,
  deliverylocation: defaultLocation, // default to recipient location
  deliveryConfirmationImage: "",
  deliveryNotes: "",
  missionAccepted: false,
  feedbackNotes: "",
  recipientName: "",
  recipientPhoneNumber: "",
  recipientId: "", // reference?
  created: new Date(), // time stamp
  lastUpdated: new Date(), // time stamp
};

const Mission = {
  load: (data: unknown) => merge(data, defaultMissionData),
  sanitize: (data: unknown) => sanitize(data, defaultMissionData),
  filterByStatus: (missions: MissionInterface[], status: MissionStatus) =>
    missions.filter((mission) => mission.status === status),
};

export default Mission;
