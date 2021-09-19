import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"
import uuid from "react-native-uuid"
import { noSpaces } from "../utils/regex"

function initFirebase() {
  const config = {
    apiKey: process.env.apiKey,
    authDomain: "weddingapp-94d85.firebaseapp.com",
    databaseURL: "https://weddingapp-94d85.firebaseio.com",
    projectId: "weddingapp-94d85",
    storageBucket: "weddingapp-94d85.appspot.com",
    messagingSenderId: "145233983231",
    appId: "1:145233983231:web:7ff5c5f80fbe88b4e4feca",
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
}

export default class ApiService {
  public auth: firebase.auth.Auth
  private firestore: firebase.firestore.Firestore
  private storage: firebase.storage.Storage

  constructor() {
    initFirebase()
    this.auth = firebase.auth()
    this.firestore = firebase.firestore()
    this.storage = firebase.storage()
  }

  /*
  async signIn(email: string, password: string) {
    try {
      email = email.trim()
      if (!(email && password)) {
        throw new Error("Email and password are required.")
      }
      if (!email.match(emailPattern)) {
        throw new Error("Email is badly formatted.")
      }
      await this.auth.signInWithEmailAndPassword(email, password)
      return "Signed in successfully!"
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  */
  rsvpCurrentUser = async (attending: boolean) => {
    try {
      if (!this.auth.currentUser) throw Error("User not signed in for RSVP.")
      const thisUser = await this.firestore
        .collection("users")
        .where("uid", "==", this.auth.currentUser?.uid)
        .get()
      await thisUser.docs[0].ref.update({ rsvp: attending })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async addGuest({
    firstName,
    lastName,
  }: {
    firstName: string
    lastName: string
  }) {
    try {
      if (!(firstName && lastName)) {
        throw new Error("Please provide a first name and a last name.")
      }
      firstName = firstName.trim()
      lastName.trim()
      if (!firstName.match(noSpaces)) {
        throw new Error("Please enter the guest's last name on the next line.")
      }
      const alreadyAdded = await this.firestore
        .collection("guests")
        .where("firstName", "==", firstName)
        .where("lastName", "==", lastName)
        .get()
      if (!alreadyAdded.empty) {
        throw new Error("That guest already exists.")
      }
      const alreadyAddedUser = await this.firestore
        .collection("users")
        .where("firstName", "==", firstName)
        .where("lastName", "==", lastName)
        .get()
      if (!alreadyAddedUser.empty) {
        throw new Error("That user already exists.")
      }
      const uid = this.auth.currentUser?.uid
      if (!uid) {
        throw new Error("Please sign in again to continue.")
      }
      this.firestore.collection("guests").add({
        firstName,
        lastName,
        label: "None",
        role: "guest",
        addedBy: uid,
      })
    } catch (err) {
      // console.error(err)
      throw err
    }
  }

  /*
  async sendForgotEmail(email: string) {
    try {
      if (!email) {
        throw new Error("Please provide an email.")
      }
      email = email.trim()
      if (!email.match(emailPattern)) {
        throw new Error("Please enter a valid email address.")
      }
      await this.auth.sendPasswordResetEmail(email)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  */
  /*
  async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    try {
      if (!(firstName && lastName && email && password)) {
        throw new Error("All fields are required.")
      }
      firstName = firstName.trim()
      lastName = lastName.trim()
      email = email.trim()
      if (!email.match(emailPattern)) {
        throw new Error("Email is badly formatted.")
      }
      const signUpResult = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      )
      const uid = signUpResult.user?.uid
      if (!uid) throw new Error("No uid from sign up result.")
      const guestsOfSameName = await this.firestore
        .collection("guests")
        .where("firstName", "==", firstName)
        .where("lastName", "==", lastName)
        .get()
      for await (const guestOfSameName of guestsOfSameName.docs) {
        await guestOfSameName.ref.delete()
      }
      await this.firestore.collection("users").add({
        firstName,
        lastName,
        email,
        rsvp: true,
        uid,
        role: "invitee",
      })
      // await this.auth.currentUser?.sendEmailVerification()
      return "Sign up successful!"
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  */

  async signOut() {
    await this.auth.signOut()
  }

  async updateName(key: string, name: string) {
    try {
      if (!name) throw new Error("No first name provided.")
      name = name.trim()
      const uid = this.auth.currentUser?.uid
      if (!uid) throw new Error("Not signed in.")
      const userQuery = await this.firestore
        .collection("users")
        .where("uid", "==", uid)
        .get()
      await userQuery.docs[0].ref.update({ [key]: name })
      return "Updated name successfully."
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async uploadProfilePhoto(photo: any) {
    try {
      const storageRef = this.storage.ref("profile-photos")
      await storageRef
        .child(`${this.auth.currentUser?.uid}/profile.jpg`)
        .put(photo, {
          contentType: "image/jpeg",
        })
      photo.close()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async uploadSharedPhoto(photo: any) {
    try {
      const storageRef = this.storage
        .ref()
        .child(`wedding-photos/${uuid.v4()}.jpg`)
      await storageRef.put(photo, {
        contentType: "image/jpeg",
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  userRef() {
    return this.firestore.collection("users")
  }

  guestsRef() {
    return this.firestore.collection("guests")
  }

  weddingInfoRef() {
    return this.firestore.collection("weddingInfo")
  }

  profilePhotoRef() {
    return this.storage.ref(
      `profile-photos/${this.auth.currentUser?.uid}/profile.jpg`
    )
  }

  async userPhoto(uid: string) {
    try {
      if (!uid) return ""
      return await this.storage
        .ref(`profile-photos/${uid}/profile.jpg`)
        .getDownloadURL()
    } catch (err) {
      console.error(err)
      return ""
    }
  }

  sharedPhotosRef() {
    return this.storage.ref(`wedding-photos`)
  }

  async deleteGuest(docId: string) {
    try {
      if (!docId) throw new Error("Please provide a doc id.")
      await this.firestore.collection("guests").doc(docId).delete()
    } catch (err) {
      console.error(err)
    }
  }
}
