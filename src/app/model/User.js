import { get } from "lodash";

/**
 * Defines the volunteer.
 *
 * @version 1.0
 */
class User {
  /**
   * Assign the current user as a volunteer for the mission with the given missionId
   * @param {object} fs - firestore instance
   * @param {string} missionId - ID of mission that user wants to volunteer for
   * @param {string} userId - ID of user that wants to volunteer for mission
   * @param {string} status - Status to assign the mission
   */

  assignAsVolunteer(fs, missionId, userId, status = "doing") {
    //this._assignUserToMission(fs, missionId, userId, "volunteerId", status);

    fs.collection("missions").doc(missionId).update({ volunteerId: userId, status: status });

    fs.collection("users")
      .doc(userId)
      .update({
        volunteeringMissionIds: fs.FieldValue.arrayUnion(missionId),
      });
  }

  /**
   * Assign the current user as an owner for the mission with the given missionId
   * @param {object} fs
   * @param {string} missionId
   * @param {string} userId
   */
  assignAsOwner(fs, missionId, userId, status = "todo") {
    //this._assignUserToMission(fs, missionId, userId, "ownerId");

    fs.collection("missions").doc(missionId).update({ ownerId: userId, status: status });

    fs.collection("users")
      .doc(userId)
      .update({
        owningMissionIds: fs.FieldValue.arrayUnion(missionId),
      });
  }

  /**
   * Links a user with a phone number, using an SMS code and a Recaptcha.
   * @param {object} firebase
   * @param {string} phoneNumber
   * @param {func} recaptchaVerifier
   * @param {func} callback
   * @return {firebase.auth.Auth}
   */
  linkPhoneAuthentication(firebase, phoneNumber, recaptchaVerfier, callback) {
    return firebase
      .auth()
      .currentUser.linkWithPhoneNumber(phoneNumber, recaptchaVerfier)
      .then(function (confirmationResult) {
        var code = window.prompt("Provide your SMS code");
        recaptchaVerfier.clear();
        return confirmationResult.confirm(code).then(() => {
          callback();
        });
      })
      .catch((err) =>
        alert(
          "You already have an account associated with this phone number. Please sign in using that number."
        )
      );
  }

  /**
   * Returns the current authentication object.
   * @param {object} state
   * @return {FirebaseAuth}
   */
  getAuth = (state) => get(state, "firebase.auth");
}

export default new User();
