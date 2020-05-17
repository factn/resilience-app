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

export class User extends BaseModel {
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
   * In case an user have logged in but his user profile is empty
   * This can only happens if user decided to login without
   * going the proper signup channel as firebase allow singup
   * by login as a default
   *
   * create a user
   * @param {string | null} userUid - user
   * @param {object} data- updated data
   * @returns {string} userUid - return back given uid or the generated new one
   */
  createProfileIfNotExist(auth: any, profile: any) {
    if (!auth || !profile) return;
    if (auth.isLoaded && !auth.isEmpty && profile.isEmpty && profile.isLoaded) {
      return this.getCollection("users").doc(auth.uid).set(this.load(auth));
    }
  }

  createProfile(userUid: string | null, data: object) {
    if (userUid) {
      return this.getCollection("users")
        .doc(userUid)
        .set(this.load({ ...data, uid: userUid }))
        .then(() => userUid);
    }

    const ref = this.getCollection("users").doc();
    return ref.set(this.load({ ...data, uid: ref.id })).then(() => ref.id);
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
        .where("status", "in", [
          MissionStatus.assigned,
          MissionStatus.started,
          MissionStatus.delivered,
        ])
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

  getAllRequestedMissions(userUid: string) {
    return this.getCollection("organizations")
      .doc(Organization.uid)
      .collection("missions")
      .where("recipientUid", "==", userUid)
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => doc.data()))
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  getUserProfile(userUid: string): Promise<UserInterface> {
    return this.getCollection("users")
      .doc(userUid)
      .get()
      .then((snapshot) => {
        return snapshot.data() as UserInterface;
      });
  }
}

export default new User("users", defaultUserData);
