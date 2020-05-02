import BaseModel from "./BaseModel";
import {
  Location,
  MissionFundedStatus,
  MissionInterface,
  MissionStatus,
  MissionType,
  TimeWindow,
  TimeWindowType,
} from "./schema";
import _ from "lodash";

const defaultLocation: Location = {
  address: "",
  lat: 0,
  lng: 0,
  label: "",
};

const defaultTimeWindow: TimeWindow = {
  startTime: "",
  timeWindowType: TimeWindowType.whenever,
};

type Group = {
  groupId: string;
  groupDisplayName: string;
  missions: MissionInterface[];
};

const defaultMissionData: MissionInterface = {
  id: "",
  type: MissionType.errand,
  status: MissionStatus.unassigned,
  createdDate: new Date().toUTCString(),
  missionDetails: {},
  fundedStatus: MissionFundedStatus.notfunded,
  fundedDate: null,
  readyToStart: false,
  organizationId: "",

  groupId: "",
  groupDisplayName: "",

  tentativeVolunteerDisplayName: "",
  tentativeVolunteerId: "",
  tentativeVolunteerPhoneNumber: "",

  volunteerId: "",
  volunteerDisplayName: "",
  volunteerPhoneNumber: "",

  recipientDisplayName: "No Recipient Name",
  recipientPhoneNumber: "",
  recipientId: "No Recipient Id", // reference?

  pickUpWindow: defaultTimeWindow, // nb this can be an exact time or can be null
  pickUpLocation: defaultLocation,

  deliveryWindow: defaultTimeWindow,
  deliveryLocation: defaultLocation, // default to recipient location

  deliveryConfirmationImage: "",
  deliveryNotes: "",
  feedbackNotes: "",
};

const fsInProposed = (orgId: string) => ({
  collection: "organizations",
  doc: orgId,
  subcollections: [
    {
      collection: "missions",
      where: [
        ["status", "==", MissionStatus.unassigned],
        ["fundedStatus", "==", MissionFundedStatus.notfunded],
      ],
    },
  ],
  storeAs: "missionsInProposed",
});
const fsInPlanning = (orgId: string) => ({
  collection: "organizations",
  doc: orgId,
  subcollections: [
    {
      collection: "missions",
      where: [["status", "in", [MissionStatus.tentative, MissionStatus.assigned]]],
    },
  ],
  storeAs: "missionsInPlanning",
});
const fsInProgress = (orgId: string) => ({
  collection: "organizations",
  doc: orgId,
  subcollections: [
    {
      collection: "missions",
      where: [["status", "in", [MissionStatus.started, MissionStatus.delivered]]],
    },
  ],
  storeAs: "missionsInProgress",
});
const fsInDone = (orgId: string) => ({
  collection: "organizations",
  doc: orgId,
  subcollections: [
    {
      collection: "missions",
      where: [["status", "in", [MissionStatus.succeeded, MissionStatus.failed]]],
    },
  ],
  storeAs: "missionsInDone",
});
const fsIncomplete = (orgId: string) => ({
  collection: "organizations",
  doc: orgId,
  subcollections: [
    {
      collection: "missions",
      where: [
        [
          "status",
          "in",
          [
            MissionStatus.tentative,
            MissionStatus.assigned,
            MissionStatus.started,
            MissionStatus.delivered,
          ],
        ],
      ],
    },
  ],
  storeAs: "incompleteMissions",
});

const getAllGroups = (missions: MissionInterface[]) => {
  let groups: Group[] = [];
  let singleMissions: MissionInterface[] = [];
  missions.forEach((mission: MissionInterface) => {
    if (mission.groupId) {
      const index = _.findIndex(groups, ["groupId", mission.groupId]);
      if (index > -1) {
        groups[index].missions.push(mission);
      } else {
        groups.push({
          groupId: mission.groupId,
          groupDisplayName: mission.groupDisplayName,
          missions: [mission],
        });
      }
    } else {
      singleMissions.push(mission);
    }
  });
  return {
    groups,
    singleMissions,
  };
};

class Mission extends BaseModel {
  collectionName = "missions";
  Status = MissionStatus;
  FundedStatus = MissionFundedStatus;
  TimeWindowType = TimeWindowType;

  selectInProposed = (state: any) => state.firestore.ordered.missionsInProposed || [];
  fsInProposed = fsInProposed;
  selectInPlanning = (state: any) => state.firestore.ordered.missionsInPlanning || [];
  fsInPlanning = fsInPlanning;
  selectInProgress = (state: any) => state.firestore.ordered.missionsInProgress || [];
  fsInProgress = fsInProgress;
  selectInDone = (state: any) => state.firestore.ordered.missionsInDone || [];
  fsInDone = fsInDone;
  selectIncomplete = (state: any) => state.firestore.ordered.incompleteMissions || [];
  fsIncomplete = fsIncomplete;

  getAllGroups = getAllGroups;

  getById = async (missionId: string) => {
    const collection = this.getCollection("organizations").doc("1").collection("missions");
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

  /**
   * Returns all available missions.
   * A mission is available if it has a status of "tentative"
   */
  getAllAvailable = async () => {
    const collection = this.getCollection("organizations").doc("1").collection("missions");

    const missionsAvailableForEveryone = await collection
      .where("status", "==", MissionStatus.tentative)
      .get();

    if (missionsAvailableForEveryone.docs.length < 1) {
      return [];
    }
    const missions = missionsAvailableForEveryone.docs.map((doc) => doc.data());

    return missions;
  };
  /**
   * Update a mision
   * @param {string} missionId - mission
   * @param {object} data- updated data
   */
  update(missionId: string, data: object) {
    let sanitized = this.sanitize(data);
    return this.getCollection("organizations")
      .doc("1")
      .collection("missions")
      .doc(missionId)
      .update({
        ...sanitized,
      });
  }

  filterByStatus = (missions: MissionInterface[], status: MissionStatus) =>
    missions.filter((mission) => mission.status === status);
}

export default new Mission("missions", defaultMissionData);
