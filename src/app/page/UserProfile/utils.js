import Organization from "../../model/Organization";

/*TODO We need to check the merge data, especially these fields
 *  volunteerId, volunteerProfileName, volunteerPhoneNumber
 *  tentativeVolunteerId, tentativeVolunteerProfileName, tentativeVoluteerPhoneNumber
 */
/* eslint-disable */
// If we decided to get merge to work once again
async function errorHandler(error) {
  // we need to merge data with this error
  if (["auth/credential-already-in-use", "auth/email-already-in-use"].indexOf(error.code) > -1) {
    // the code below take way too much time to reseach
    // and so I am saving it here for future reference
    var prevUser = auth.currentUser;
    var prevUserDoc = await firestore.collection("users").doc(prevUser.uid).get();
    const prevUserData = prevUserDoc.data();
    // handle the merging data for missions
    var [previousCreateMissions, previousVolunteerMissions] = await Promise.all([
      firestore
        .collection("organizations")
        .doc(Organization.id)
        .collection("missions")
        .where("ownerId", "==", prevUser.uid)
        .get(),
      firestore
        .collection("organizations")
        .doc(Organization.id)
        .collection("missions")
        .where("volunteerId", "==", prevUser.uid)
        .get(),
    ]);

    var currentUserData;
    var currentUser;

    try {
      const result = await auth.signInWithCredential(error.credential);
      currentUser = result.user;
      const currentUserDoc = await firestore.collection("users").doc(currentUser.uid).get();
      currentUserData = currentUserDoc.data();

      // have to remove previous user, otherwise we can not link
      prevUser.delete();
      prevUser.linkWithCredential(error.credential);
      await auth.signInWithCredential(error.credential);
      // handle the merging data for users database
      const mergeData = _.mergeWith(prevUserData, currentUserData, (preVal, curVal) => {
        if (_.isArray(preVal)) {
          return preVal.concat(curVal);
        }
        return preVal ? preVal : curVal;
      });

      firestore.collection("users").doc(currentUser.uid).set(mergeData);

      // making sure missions data are consitency
      previousCreateMissions.forEach((doc) => {
        firestore
          .collection("organizations")
          .doc(Organization.id)
          .collection("missions")
          .doc(doc.id)
          .update({ ownerId: currentUser.uid });
      });
      previousVolunteerMissions.forEach((doc) => {
        firestore
          .collection("organizations")
          .doc(Organization.id)
          .collection("missions")
          .doc(doc.id)
          .update({ volunteerId: currentUser.uid });
      });
    } catch (e) {
      previousCreateMissions.forEach((doc) => {
        firestore
          .collection("organizations")
          .doc(Organization.id)
          .collection("missions")
          .doc(doc.id)
          .update({ ownerId: prevUser.uid });
      });
      previousVolunteerMissions.forEach((doc) => {
        firestore
          .collection("organizations")
          .doc(Organization.id)
          .collection("missions")
          .doc(doc.id)
          .update({ volunteerId: prevUser.uid });
      });
      firestore.collection("users").doc(prevUser.uid).set(prevUserData);
      firestore.collection("users").doc(currentUser.uid).set(currentUserData);
    } finally {
      return;
    }
  }
}
/* eslint-enable */
