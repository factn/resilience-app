import { getFirebase, getFirestore } from "react-redux-firebase";

import { useFirebase } from "react-redux-firebase";

class User {
  assginedToMission(fs, missionId, assignedId) {
    fs.update(
      { collection: "missions", doc: missionId },
      { status: "doing", assignedId: assignedId }
    );
  }
}

export default new User();
