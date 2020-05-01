if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const admin = require("firebase-admin");
const data = require("./data.json");

let serviceAccount = process.env.FIREBASE_SECRET;

const credential = JSON.parse(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(credential),
  databaseURL: "https://mutualaid-757f6.firebaseio.com",
});

/**
 * Data is a collection if
 *  - it has a odd depth
 *  - contains only objects or contains no objects.
 */
function isCollection(data, path, depth) {
  if (typeof data != "object" || data == null || data.length === 0 || isEmpty(data)) {
    return false;
  }

  for (const key in data) {
    if (typeof data[key] != "object" || data[key] == null) {
      // If there is at least one non-object item in the data then it cannot be collection.
      return false;
    }
  }

  return true;
}

// Checks if object is empty.
function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

async function upload(data, path) {
  return await admin
    .firestore()
    .doc(path.join("/"))
    .set(data)
    .then(() => console.log(`Document ${path.join("/")} uploaded.`))
    .catch(() => console.error(`Could not write document ${path.join("/")}.`));
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

function deleteQueryBatch(db, query, resolve, reject) {
  query
    .get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // Delete documents in a batch
      let batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, resolve, reject);
      });
    })
    .catch(reject);
}
function deleteCollection(collectionPath) {
  let collectionRef = admin.firestore().collection(collectionPath);
  let query = collectionRef.orderBy("__name__").limit(200);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(admin.firestore(), query, resolve, reject);
  });
}

deleteCollection("users");
deleteCollection("organizations");
resolve(data);
