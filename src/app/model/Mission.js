import { get, filter } from "lodash";

/**
 * Defines the task requested by an intake and carried out
 # by a volunteer.
 *
 * @version 1.0
 */
class Mission {

  /** 
   * Returns all missions.
   * @param {object} state
   * @return {Array.<Mission>}  
   */
  getAll = (state) => get(state, "firestore.data.missions");

  /** 
   * Given an array of missions and a status, return missions 
   * matching the given status
   * @param {Array.<Mission>} missions
   * @param {string} status
   * @return {Array.<Mission>}  
   */
  filterByStatus = (missions, status) => filter(missions, (m) => m.status === status);
}

export default new Mission();
