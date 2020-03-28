import { createSelector } from "reselect";
import { getFirebase } from "react-redux-firebase";
import { get } from "lodash";

class User {
  assginedToMission(fs, missionId, assignedId) {
    fs.update(
      { collection: "missions", doc: missionId },
      { status: "doing", assignedId: assignedId }
    );
    fs.collection("users")
      .doc(assignedId)
      .update({
        assigned: fs.FieldValue.arrayUnion(missionId),
      });
  }

  getAuth = (state) => get(state, "firebase.auth");
}

export default new User();
