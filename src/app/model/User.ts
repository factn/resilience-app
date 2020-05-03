import BaseModel from "./BaseModel";
import { Location, MissionStatus, UserInterface, VolunteerStatus } from "./schema";
import Organization from "./Organization";

const defaultLocation: Location = {
  address: "",
  lat: 0,
  lng: 0,
  label: "",
};
const defaultUserData: UserInterface = {
  id: "",
  cannotReceiveTexts: false,
  photoURL: "",
  description: "",
  displayName: "",
  phoneNumber: "",
  email: "",
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

const fsVolunteer = (orgId: string) => ({
  collection: "users",
  where: [
    ["isVolunteer", "==", true],
    ["organizationId", "==", orgId],
  ],
  storeAs: "volunteers",
});

class User extends BaseModel {
  VolunteerStatus = VolunteerStatus;

  fsVolunteer = fsVolunteer;

  /**
   * Update an user
   * @param {string} userId - user
   * @param {object} data- updated data
   */
  update(userId: string, data: object) {
    let sanitized = this.sanitize(data);
    return this.getCollection("users")
      .doc(userId)
      .update({
        ...sanitized,
      });
  }

  /**
   * Given a displayName returns the first user object
   * @param {string} displayName : displayName of user
   * @return {object}
   */
  async getIdByDisplayName(displayName: string): Promise<string> {
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

    return doc.docs[0].id;
  }

  /**
   * Returns all missions that a volunteer is associated with or has been suggested for.
   * @param userId UserId of the volunteer
   */
  async getAllAssociatedMissions(userId: string) {
    const collection = this.getCollection("organizations")
      .doc(Organization.id)
      .collection("missions");

    const volunteeredMissions = await collection.where("volunteerId", "==", userId).get();
    const suggestedMissions = await collection.where("tentativeVolunteerId", "==", userId).get();

    const missionsDocumentSnapshot = volunteeredMissions.docs.concat(suggestedMissions.docs);

    if (missionsDocumentSnapshot.length < 1) {
      return [];
    }
    const missions = missionsDocumentSnapshot.map((doc) => doc.data());

    return missions;
  }

  /**
   * Return all completed missions by the user
   * @param userId UserId of the volunteer
   */

  async getAllCompletedMissions(userId: string) {
    const collection = this.getCollection("organizations")
      .doc(Organization.id)
      .collection("missions");

    const deliveredMissions = await collection
      .where("volunteerId", "==", userId)
      .where("status", "==", MissionStatus.delivered)
      .get();
    const succeededMissions = await collection
      .where("volunteerId", "==", userId)
      .where("status", "==", MissionStatus.succeeded)
      .get();
    const missionsDocumentSnapshot = deliveredMissions.docs.concat(succeededMissions.docs);

    if (missionsDocumentSnapshot.length < 0) {
      return [];
    }
    const missions = missionsDocumentSnapshot.map((doc) => doc.data());

    return missions;
  }
}

export default new User("users", defaultUserData);
