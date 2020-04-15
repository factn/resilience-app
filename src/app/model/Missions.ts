import { CustomRepository, getRepository } from 'fireorm';
import { BaseRepository } from './BaseRepository'
import { Mission, MissionStatus } from './schema';

@CustomRepository(Mission)
class MissionRepository extends BaseRepository<Mission> { }

/**
 * Defines the task requested by an intake and carried out
 # by a volunteer.
 *
 * @version 1.0
 */
class Missions {
  
  repo() : MissionRepository {
    return getRepository(Mission) as MissionRepository;
  }

  /**
   * Returns all missions.
   * @param {object} state
   * @return {Array.<Mission>}
   */
  async getAll() : Promise<Mission[]>  {
    return this.repo().find();
  }

  /**
   * Given an array of missions and a status, return missions
   * matching the given status
   * @param {Array.<Mission>} missions
   * @param {string} status
   * @return {Array.<Mission>}
   */
  async byStatus(status: string): Promise<Mission[]>  {
    return this.repo().whereEqualTo('status', status).find();
  };

 
  /**
   * Assign the current user as a volunteer for the mission with the given missionId
   * @param {string} missionId - ID of mission that user wants to volunteer for
   * @param {string} userId - ID of user that wants to volunteer for mission
   */

  async volunteerForMission(missionId: string, userId: string) { 
    var missions = this.repo();
    var mission = await missions.findById(missionId);
    mission.volunteerId = userId;
    mission.status = MissionStatus.assigned;
    return missions.update(mission);
  }

  /**
   * Removes a volunteer for the mission with the given missionId and
   * sets status to unassigned.
   * @param {string} missionId - ID of mission from which volunteer will 
   *                             be removed. 
   */

  async removeVolunteerFromMission(missionId: string) { 
    const missions = this.repo();
    const mission = await missions.findById(missionId);
    console.log("returned !!!! ===== " + mission);
    mission.volunteerId = '';
    mission.status = MissionStatus.unassigned;
    console.log("set mission status and volunteer.");
    return this.repo().update(mission);
  }


  /**
   * Marking the mission with the given missionId as started
   * @param {string} missionId - ID of mission that user wants to start
   */

  async startMission(missionId: string) { 
    var missions = this.repo();
    var mission = await missions.findById(missionId);
    if (mission.volunteerId !== undefined) { //ensure that mission has an assigned volunteer
      mission.status = MissionStatus.started;
    }
    return missions.update(mission);
  }
}

export default new Missions();
