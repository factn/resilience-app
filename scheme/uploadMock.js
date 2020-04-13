<<<<<<< HEAD
const admin = require("firebase-admin");
=======
const admin = require("firebase-admin"); 
>>>>>>> add way to upload mock data
//node_modules/firebase-admin");
const serviceAccount = require("./secret.json");
const data = require("./data.json");

<<<<<<< HEAD
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mutualaid-757f6.firebaseio.com",
});
=======

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mutualaid-757f6.firebaseio.com",
})
>>>>>>> add way to upload mock data

/**
 * Data is a collection if
 *  - it has a odd depth
 *  - contains only objects or contains no objects.
 */
function isCollection(data, path, depth) {
<<<<<<< HEAD
  if (typeof data != "object" || data == null || data.length === 0 || isEmpty(data)) {
=======
  if (
    typeof data != 'object' ||
    data == null ||
    data.length === 0 ||
    isEmpty(data)
  ) {
>>>>>>> add way to upload mock data
    return false;
  }

  for (const key in data) {
<<<<<<< HEAD
    if (typeof data[key] != "object" || data[key] == null) {
=======
    if (typeof data[key] != 'object' || data[key] == null) {
>>>>>>> add way to upload mock data
      // If there is at least one non-object item in the data then it cannot be collection.
      return false;
    }
  }

  return true;
}

// Checks if object is empty.
function isEmpty(obj) {
<<<<<<< HEAD
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
=======
  for(const key in obj) {
    if(obj.hasOwnProperty(key)) {
>>>>>>> add way to upload mock data
      return false;
    }
  }
  return true;
}

async function upload(data, path) {
<<<<<<< HEAD
  return await admin
    .firestore()
    .doc(path.join("/"))
    .set(data)
    .then(() => console.log(`Document ${path.join("/")} uploaded.`))
    .catch(() => console.error(`Could not write document ${path.join("/")}.`));
=======
  return await admin.firestore()
    .doc(path.join('/'))
    .set(data)
    .then(() => console.log(`Document ${path.join('/')} uploaded.`))
    .catch(() => console.error(`Could not write document ${path.join('/')}.`));
>>>>>>> add way to upload mock data
}

/**
 *
 */
async function resolve(data, path = []) {
  if (path.length > 0 && path.length % 2 == 0) {
    // Document's length of path is always even, however, one of keys can actually be a collection.

    // Copy an object.
    const documentData = Object.assign({}, data);

    for (const key in data) {
      // Resolve each collection and remove it from document data.
      if (isCollection(data[key], [...path, key])) {
        // Remove a collection from the document data.
        delete documentData[key];
        // Resolve a colleciton.
        resolve(data[key], [...path, key]);
      }
    }

    // If document is empty then it means it only consisted of collections.
    if (!isEmpty(documentData)) {
      // Upload a document free of collections.
      await upload(documentData, path);
    }
  } else {
    // Collection's length of is always odd.
    for (const key in data) {
      // Resolve each collection.
      await resolve(data[key], [...path, key]);
    }
  }
}

resolve(data);
