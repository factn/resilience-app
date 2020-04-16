import { UserInterface, VolunteerStatus, Location, MissionStatus } from "./schema";
import BaseModel from "./BaseModel";

const defaultLocation: Location = {
  address: "",
  lat: 0,
  long: 0,
  label: "",
};
const defaultUserData: UserInterface = {
  id: "",
  phone: 0,
  photoURL: "",
  displayName: "",
  location: defaultLocation,
  organizationId: 0,
  isVolunteer: false,
  isOrganizer: false,
  volunteerDetails: {
    hasTransportation: false,
    status: VolunteerStatus.created,
    privateNotes: "",
  },
  organizerDetails: {},
};

class User extends BaseModel {
  VolunteerStatus = VolunteerStatus;

  /**
   * User volunteer for a mission
   * @param {string} userId : user
   * @param {string} missionId : mission that user want to volunteer for
   */
  async volunteerMission(userId: string, missionId: string) {
    let collection = this.getCollection("missions");
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
    if (data === undefined) {
      throw Error(`no data for this mission: ${missionId}`);
    }

    if (data.volunteerId) {
      throw Error(`User: ${userId} are not allowed to voluntter for this mission: ${missionId}`);
    }

    try {
      collection.doc(missionId).update({
        volunteerId: userId,
        status: MissionStatus.assigned,
      });
    } catch (e) {
      //TODO show error message to user
      throw e;
    }
  }

  /**
   * User start a mission
   * @param {string} userId - user
   * @param {string} missionId - mission that user want to start
   */
  async startMission(userId: string, missionId: string) {
    let collection = this.getCollection("missions");
    let doc;
    try {
      doc = await collection.doc(missionId).get();
    } catch (e) {
      //TODO show error message to user
      throw e;
    }

    if (!doc.exists) {
      throw Error(`This mission:  ${missionId} does not exist`);
    }

    //TODO: this need to be a rule in the database
    let data = doc.data();
    if (data === undefined) {
      throw Error(`no data for this mission: ${missionId}`);
    }
    if (data.volunteerId !== userId) {
      throw Error(`User: ${userId} are not allowed to start this mission: ${missionId}`);
    }
    try {
      collection.doc(missionId).update({
        status: MissionStatus.started,
      });
    } catch (e) {
      //TODO show error message to user
      throw e;
    }
  }

  /**
   * User deliver a mission
   * //TOD add image
   * @param {string} userId - user
   * @param {string} missionId  - mission id that user delivered
   */
  async deliverMission(userId: string, missionId: string) {
    let collection = this.getCollection("missions");
    let doc;
    try {
      doc = await collection.doc(missionId).get();
    } catch (e) {
      //TODO show error message to user
      throw e;
    }

    if (!doc.exists) {
      throw Error(`This mission:  ${missionId} does not exist`);
    }
    //TODO: this need to be a rule in the database
    let data = doc.data();
    if (data === undefined) {
      throw Error(`no data for this mission: ${missionId}`);
    }
    if (data.volunteerId !== userId) {
      throw Error(`User: ${userId} are not allowed to deliver this mission: ${missionId}`);
    }
    try {
      collection.doc(missionId).update({
        status: MissionStatus.delivered,
      });
    } catch (e) {
      //TODO show error msg to user
      throw e;
    }
  }
}

export default new User("users", defaultUserData);
