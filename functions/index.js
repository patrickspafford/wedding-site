const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

const serviceAccount =
  require('./weddingapp-94d85-firebase-adminsdk-8qx1a-a226242d62.json');

const wait = (duration) => new Promise((resolve) => {
  setTimeout(() => resolve(), duration);
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'weddingapp-94d85.appspot.com',
  });
}

// eslint-disable-next-line
exports.createUserInFirestore = functions.auth.user().onCreate(async (user) => {
  try {
    await wait(1500);
    const updatedUser = await admin.auth().getUser(user.uid);
    console.log('Updated user:', updatedUser);
    const [firstName, lastName] = updatedUser.displayName.split(' ');
    console.log(`Names: ${firstName} ${lastName}`);
    const updatedUserDoc = {
      email: user.email,
      firstName,
      lastName,
      role: 'invitee',
      rsvp: true,
      uid: user.uid,
    };
    await admin.firestore().collection('users').add(updatedUserDoc);
    const response = await fetch('https://picsum.photos/seed/picsum/250/250');
    const bucket = admin.storage()
        .bucket('weddingapp-94d85.appspot.com');
    const file = bucket.file(`profile-photos/${user.uid}/profile.jpg`);
    const buffer = await response.buffer();
    file.save(buffer, function(err) {
      if (!err) {
        console.log('File written successfully');
      } else console.log(err);
    });
  } catch (err) {
    console.error(err);
  }
});
