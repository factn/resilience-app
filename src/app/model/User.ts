import BaseModel from "./BaseModel";
import Organization from "./Organization";
import { Location, MissionStatus, UserInterface, VolunteerStatus } from "./schema";

const defaultLocation: Location = {
  address: "",
  lat: 0,
  lng: 0,
  label: "",
};
const defaultUserData: UserInterface = {
  uid: "",
  cannotReceiveTexts: false,
  photoURL: "",
  description: "",
  displayName: "",
  phoneNumber: "",
  email: "",
  location: defaultLocation,
  organizationUid: 0,
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

const fsVolunteer = (orgUid: string) => ({
  collection: "users",
  where: [
    ["isVolunteer", "==", true],
    ["organizationUid", "==", orgUid],
  ],
  storeAs: "volunteers",
});

class User extends BaseModel {
  VolunteerStatus = VolunteerStatus;

  fsVolunteer = fsVolunteer;

  /**
   * Update an user
   * @param {string} userUid - user
   * @param {object} data- updated data
   */
  update(userUid: string, data: object) {
    let sanitized = this.sanitize(data);
    return this.getCollection("users")
      .doc(userUid)
      .update({
        ...sanitized,
      });
  }
  /**
   * create a user
   * @param {string} userUid - user
   * @param {object} data- updated data
   */
  createProfile(userUid: string, data: object) {
    return this.getCollection("users")
      .doc(userUid)
      .set(this.load({ data, uid: userUid }));
  }

  /**
   * Returns all missions that a volunteer is associated with or has been suggested for.
   * @param userUid UserId of the volunteer
   */
  getAllAssociatedMissions(userUid: string) {
    const collection = this.getCollection("organizations")
      .doc(Organization.uid)
      .collection("missions");

    return Promise.all([
      collection
        .where("volunteerUid", "==", userUid)
        .where("status", "in", [MissionStatus.assigned, MissionStatus.started])
        .get(),
      collection
        .where("tentativeVolunteerUid", "==", userUid)
        .where("status", "in", [MissionStatus.tentative])
        .get(),
    ]).then(([volunteer, tentative]) => {
      const docs = volunteer.docs.concat(tentative.docs);
      return docs.map((doc) => doc.data());
    });
  }

  /**
   * Return all completed missions by the user
   * @param userUid UserId of the volunteer
   */

  getAllCompletedMissions(userUid: string) {
    return this.getCollection("organizations")
      .doc(Organization.uid)
      .collection("missions")
      .where("volunteerUid", "==", userUid)
      .where("status", "in", [MissionStatus.succeeded, MissionStatus.failed])
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data());
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new User("users", defaultUserData);
