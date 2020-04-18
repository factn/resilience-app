import {
  Location,
  TimeWindow,
  TimeWindowType,
  MissionInterface,
  MissionStatus,
  MissionType,
  MissionFundedStatus,
  MissionDetails,
} from "./schema";
import BaseModel from "./BaseModel";

const defaultLocation: Location = {
  address: "No Address",
  lat: 0,
  lng: 0,
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
  readyStatus: false,
  organisationId: "",
  tentativeVolunterId: "", // this get removed if the volunteer accepts?
  volunteerId: "",
  title: "Mission Title",
  description: "No Description",
  missionDetails: defaultMissionDetails, // varies by mission type
  image: "https://via.placeholder.com/300x450",
  notes: "",
  privateNotes: "", // just for volunteer and organiser
  cost: 0.0, // Decimal if possible eg 12.21 (assume USD for MVP.0)
  pickUpWindow: defaultTimeWindow, // nb this can be an exact time or can be null
  pickUpLocation: defaultLocation,
  deliveryWindow: defaultTimeWindow,
  deliveryLocation: defaultLocation, // default to recipient location
  deliveryConfirmationImage: "",
  deliveryNotes: "",
  feedbackNotes: "",
  recipientName: "No Recipient Name",
  recipientPhoneNumber: "",
  recipientId: "No Recipient Id", // reference?
  created: new Date(), // time stamp
  lastUpdated: new Date(), // time stamp
};

const fsInProposed = {
  collection: "missions",
  where: [
    ["status", "==", MissionStatus.unassigned],
    ["fundedStatus", "==", MissionFundedStatus.notfunded],
  ],
  storeAs: "missionsInProposed",
};
const fsInPlanning = {
  collection: "missions",
  where: [["status", "in", [MissionStatus.tentative, MissionStatus.assigned]]],
  storeAs: "missionsInPlanning",
};
const fsInProgress = {
  collection: "missions",
  where: [["status", "==", [MissionStatus.started, MissionStatus.delivered]]],
  storeAs: "missionsInProgress",
};
const fsInDone = {
  collection: "missions",
  where: [
    ["status", "==", MissionStatus.unassigned],
    ["fundedStatus", "==", MissionFundedStatus.notfunded],
  ],
  storeAs: "missionsInDone",
};

class Mission extends BaseModel {
  collectionName = "missions";
  Status = MissionStatus;
  FundedStatus = MissionFundedStatus;

  selectInProposed = (state: any) => this.loads(state.firestore.ordered.missionsInProposed || []);
  fsInProposed = fsInProposed;
  selectInPlanning = (state: any) => this.loads(state.firestore.ordered.missionsInPlanning || []);
  fsInPlanning = fsInPlanning;
  selectInProgress = (state: any) => this.loads(state.firestore.ordered.missionsInProgress || []);
  fsInProgress = fsInProgress;
  selectInDone = (state: any) => this.loads(state.firestore.ordered.missionsInDone || []);
  fsInDone = fsInDone;

  getById = async (missionId: string) => {
    const collection = this.getCollection("missions");
    let doc;
    try {
      doc = await collection.doc(missionId).get();
    } catch (error) {
      //TODO show error message to user
      throw error;
    }

    if (!doc.exists) {
      throw Error(`This mission:  ${missionId} does not exist`);
    }

    let data = doc.data();

    if (!data) {
      throw Error(`no data for this mission: ${missionId}`);
    }

    return data;
  };

  filterByStatus = (missions: MissionInterface[], status: MissionStatus) =>
    missions.filter((mission) => mission.status === status);
}

export default new Mission("missions", defaultMissionData);
