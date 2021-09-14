const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const wait = (duration) => new Promise((resolve) => {
  setTimeout(() => resolve(), duration);
});

exports.createUserInFirestore = functions.auth.user().onCreate((user) => {
  wait(200)
      .then(() => {
        return admin.auth().getUser(user.uid);
      })
      .then((userRecord) => {
        console.log(userRecord.toJSON());
      })
      .catch((err) => console.error(err));
});
