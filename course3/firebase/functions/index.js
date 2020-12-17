const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Cloud Firestore.
const serviceAccount = require("./credentials.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const playersRoute = require("./players");

exports.helloWorld = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    response.send("Hello World!");
  });

exports.players = functions
  .region("europe-west1")
  .https.onRequest((req, res) => playersRoute(admin, req, res));
