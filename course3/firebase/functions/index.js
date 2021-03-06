const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Cloud Firestore.
const serviceAccount = require("./credentials.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// CORS Express middleware to enable CORS Requests.
const cors = require("cors")({
  origin: true,
});

const playersRoute = require("./players");
const questionsRoute = require("./questions");
const gameRoute = require("./game");

exports.players = functions
  .region("europe-west1")
  .https.onRequest((req, res) =>
    cors(req, res, async () => {
      await playersRoute(admin, req, res);
    })
  );

exports.questions = functions
  .region("europe-west1")
  .https.onRequest((req, res) =>
    cors(req, res, async () => {
      await questionsRoute(admin, req, res);
    })
  );

exports.game = functions
  .region("europe-west1")
  .https.onRequest((req, res) =>
    cors(req, res, async () => {
      await gameRoute(admin, req, res);
    })
  );
