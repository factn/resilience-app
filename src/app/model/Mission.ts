import {
  Location,
  TimeWindow,
  TimeWindowType,
  MissionInterface,
  MissionStatus,
  MissionType,
  MissionFundedStatus,
  MissionPayableStatus,
  MissionDetails,
} from "./schema";
import { merge, sanitize } from "./util/dataObjectUtil";

const defaultLocation: Location = {
  address: "",
  lat: 0,
  long: 0,
  label: "",
};

const defaultTimeWindow: TimeWindow = {
  startTime: new Date(),
  timeWindowType: TimeWindowType.whenever,
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
  cost: 0.0, // Decimal if possible eg 12.21 (assume USD for MVP.0)
  pickUpWindow: defaultTimeWindow, // nb this can be an exact time or can be null
  pickUplocation: defaultLocation,
  deliveryWindow: defaultTimeWindow,
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
  Status: MissionStatus,
  FundedStatus: MissionFundedStatus,

  load: (data: unknown) => (data ? merge(data, defaultMissionData) : data),
  loads: (datas: unknown[]) => (datas ? datas.map((data) => merge(data, defaultMissionData)) : []),

  sanitize: (data: unknown) => sanitize(data, defaultMissionData),
  sanitizes: (datas: unknown[]) =>
    datas ? datas.map((data) => sanitize(data, defaultMissionData)) : [],

  filterByStatus: (missions: MissionInterface[], status: MissionStatus) =>
    missions.filter((mission) => mission.status === status),
};

export default Mission;
