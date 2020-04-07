import { get, filter } from "lodash";

export const missionStatusDict = {
  todo: "need volunteers",
  doing: "in progress",
  done: "done",
  finished: "finished",
};

class Mission {
  getAll = (state) => get(state, "firestore.data.missions");

  filterByStatus = (missions, status) => filter(missions, (m) => m.status === status);
}

export default new Mission();
