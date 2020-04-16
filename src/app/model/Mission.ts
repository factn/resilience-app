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
import BaseModel from "./BaseModel";
import { v4 as uuidV4 } from "uuid";

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
  pickUpLocation: defaultLocation,
  deliveryWindow: defaultTimeWindow,
  deliveryLocation: defaultLocation, // default to recipient location
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

class Mission extends BaseModel {
  Status = MissionStatus;
  FundedStatus = MissionFundedStatus;
  collectionName = "missions";

  filterByStatus = (missions: MissionInterface[], status: MissionStatus) =>
    missions.filter((mission) => mission.status === status);

  /**
   * Given a mission object creates a new entry in firestore
   * returns the mission id
   * @param {object} mission
   * @return {string}
   */
  async create(mission: MissionInterface): Promise<string> {
    const missionId = uuidV4();
    const collection = this.getCollection(this.collectionName);

    //Add mission id and sanitize data
    mission.id = missionId;
    const sanitizedMission = this.sanitize(mission);

    //save mission in firestore
    try {
      await collection.doc(missionId).set(sanitizedMission);
    } catch (error) {
      //TODO show error message to user
      throw error;
    }

    return missionId;
  }
}

export default new Mission("missions", defaultMissionData);
