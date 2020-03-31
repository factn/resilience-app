import { get, filter } from "lodash";

class Mission {
  getAll = (state) => get(state, "firestore.data.missions");

  filterByStatus = (missions, status) => filter(missions, (m) => m.status === status);
}

export default new Mission();
