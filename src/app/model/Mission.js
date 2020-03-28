import { get } from "lodash";

class Mission {
  getAll = (state) => get(state, "firestore.data.missions");
}

export default new Mission();
