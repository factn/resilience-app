import { get } from "lodash";

class User {
  /**
   * Assign the current user as a volunteer for the mission with the given missionId
   * @param {object} fs
   * @param {string} missionId
   * @param {string} userId
   * @param {string} status
   */
  assignAsVolunteer(fs, missionId, userId, status = "doing") {
    this._assignUserToMission(fs, missionId, userId, "volunteerId", status);
  }

  /**
   * Assign the current user as an owner for the mission with the given missionId
   * @param {object} fs
   * @param {string} missionId
   * @param {string} userId
   */
  assignAsOwner(fs, missionId, userId) {
    this._assignUserToMission(fs, missionId, userId, "ownerId");
  }

  _assignUserToMission(fs, missionId, userId, assignmentType, status) {
    const missionData = status
      ? { status: status, [assignmentType]: userId }
      : { [assignmentType]: userId };

    fs.collection("missions").doc(missionId).update(missionData);

    fs.collection("users")
      .doc(userId)
      .update({
        assignedMissionIds: fs.FieldValue.arrayUnion(missionId),
      });
  }
  getAuth = (state) => get(state, "firebase.auth");
}

export default new User();
