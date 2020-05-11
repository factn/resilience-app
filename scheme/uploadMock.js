const admin = require("firebase-admin");
const data = require("./data.json");
let serviceAccount = process.env.FIREBASE_SECRET;

const firebaseConfig = {
  apiKey: "AIzaSyBnuxL3OFy6EbR5T7XlkehkyXbOxnswQtQ",
  authDomain: "mutualaid-757f6.firebaseapp.com",
  databaseURL: "https://mutualaid-757f6.firebaseio.com",
  projectId: "mutualaid-757f6",
  storageBucket: "mutualaid-757f6.appspot.com",
  messagingSenderId: "57281805127",
  appId: "1:57281805127:web:7c025105ef5fb5e5232a62",
  measurementId: "G-7L9JFWQHS2",
};

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
  admin.initializeApp(firebaseConfig);
  db = admin.firestore();
} else {
  const credential = JSON.parse(serviceAccount);
  admin.initializeApp({
    credential: admin.credential.cert(credential),
    databaseURL: "https://mutualaid-757f6.firebaseio.com",
  });
  db = admin.firestore();
}
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
  return await db
    .doc(path.join("/"))
    .set(data)
    .then(() => console.log(`Document ${path.join("/")} uploaded.`))
    .catch((e) => {
      console.error(`Could not write document ${path.join("/")}.`);
      console.log(e);
    });
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
        await resolve(data[key], [...path, key]);
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
