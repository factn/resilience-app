import { db, functions } from "./admin";
import { UserRecord } from "firebase-functions/lib/providers/auth";
import { EventContext } from "firebase-functions";

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord: UserRecord, context: EventContext) => {
  const { email, phoneNumber, uid, displayName } = userRecord;
  return db
    .collection("users")
    .doc(uid)
    .set({ email, phoneNumber, displayName })
    .catch(console.error);
};

const authOnCreate = functions.auth.user().onCreate(createProfile);
export default authOnCreate;
