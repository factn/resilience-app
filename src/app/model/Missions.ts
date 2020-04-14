import { Mission, MissionStatus } from "./schema";
import BaseModel from "./BaseModel"


/**
 * Defines the task requested by an intake and carried out
 # by a volunteer.
 *
 * @version 1.0
 */
class Missions extends BaseModel {

  /**
   * Assign the current user as a volunteer for the mission with the given missionId
   * @param {string} missionId - ID of mission that user wants to volunteer for
   * @param {string} userId - ID of user that wants to volunteer for mission
   */
  async volunteerForMission(missionId: string, userId: string) {
    let updates = this.partial({volunteerId: userId, status: MissionStatus.assigned})
    this.collection.doc(missionId).update(updates);
  }

}

export default new Missions("missions", Mission);
