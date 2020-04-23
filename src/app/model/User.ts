import { v4 as uuidV4 } from "uuid";

import BaseModel from "./BaseModel";
import Mission from "./Mission";
import {
  Location,
  MissionInterface,
  MissionStatus,
  UserInterface,
  VolunteerStatus,
} from "./schema";

const defaultLocation: Location = {
  address: "",
  lat: 0,
  lng: 0,
  label: "",
};
const defaultUserData: UserInterface = {
  id: "",
  phone: "0",
  photoURL: "",
  description: "",
  displayName: "",
  email: "email",
  location: defaultLocation,
  organizationId: 0,
  isVolunteer: false,
  isOrganizer: false,
  volunteerDetails: {
    availability: "",
    hasTransportation: false,
    status: VolunteerStatus.created,
    privateNotes: "",
  },
  organizerDetails: {},
};

class User extends BaseModel {
  VolunteerStatus = VolunteerStatus;

  async saveNewUser(data: UserInterface) {
    const collection = this.getCollection("users");

    try {
      await collection.doc(data.id).set({
        ...data,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Given a mission object creates a new mission in firestore
   * returns the new mission id
   * @param {object} mission
   * @return {string}
   */
  async createMission(mission: MissionInterface): Promise<string> {
    const missionId = uuidV4(); //generate mission id
    const collection = this.getCollection("missions");

    //Add mission id to mission object and sanitize is
    const sanitizedMission = this.load({
      id: missionId,
      ...mission,
    });

    //save mission in firestore
    try {
      await collection.doc(missionId).set(sanitizedMission);
    } catch (error) {
      //TODO show error message to user
      throw error;
    }

    return missionId;
  }

  /**
   * Given a displayName returns the first user object
   * @param {string} displayName : displayName of user
   * @return {object}
   */
  async getIdByDisplayName(displayName: string): Promise<object> {
    let collection = this.getCollection("users");
    let doc;
    try {
      doc = await collection.where("displayName", "==", displayName).get();
    } catch (error) {
      //TODO show error message to user
      throw error;
    }

    if (doc.empty) {
      throw Error(`This user: ${displayName} does not exist`);
    }

    return doc.docs[0];
  }

  /**
   * User volunteer for a mission
   * @param {string} userId : user
   * @param {string} missionId : mission that user want to volunteer for
   */
  async volunteerMission(userId: string, missionId: string) {
    let data = await Mission.getById(missionId);

    if (data.volunteerId) {
      throw Error(`User: ${userId} are not allowed to voluntter for this mission: ${missionId}`);
    }

    try {
      const collection = this.getCollection("missions");
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
   * Volunteer is removed from a mission
   * @param {string} missionId : mission that user want to volunteer for
   */

  async unvolunteerMission(missionId: string) {
    let collection = this.getCollection("missions");

    let data = await Mission.getById(missionId);

    if (!data.volunteerId) {
      throw Error(`There is currently no volunteer this mission: ${missionId}`);
    }

    try {
      collection.doc(missionId).update({
        volunteerId: "",
        status: MissionStatus.unassigned,
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

  /**
   * Returns all missions that a volunteer is associated with or has been suggested for.
   * @param userId UserId of the volunteer
   */
  async getAllAssociatedMissions(userId: string) {
    const collection = this.getCollection("missions");

    const volunteeredMissions = await collection.where("volunteerId", "==", userId).get();
    const suggestedMissions = await collection.where("proposedVolunteerId", "==", userId).get();

    const missionsDocumentSnapshot = volunteeredMissions.docs.concat(suggestedMissions.docs);

    if (missionsDocumentSnapshot.length < 1) {
      return [];
    }
    const missions = missionsDocumentSnapshot.map((doc) => doc.data());

    return missions;
  }
}

export default new User("users", defaultUserData);
