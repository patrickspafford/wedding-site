import React, { useEffect, useState } from "react"
import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

const useFirebase = () => {
  const [app, setApp] = useState<firebase.app.App | null>(null)
  const [auth, setAuth] = useState<firebase.auth.Auth | null>(null)
  const [firestore, setFirestore] =
    useState<firebase.firestore.Firestore | null>(null)

  useEffect(() => {
    const config = {
      apiKey: "AIzaSyATsifSy14qmKKc79gsx0tQnkTbUEM5aDY",
      authDomain: "weddingapp-94d85.firebaseapp.com",
      databaseURL: "https://weddingapp-94d85.firebaseio.com",
      projectId: "weddingapp-94d85",
      storageBucket: "weddingapp-94d85.appspot.com",
      messagingSenderId: "145233983231",
      appId: "1:145233983231:web:7ff5c5f80fbe88b4e4feca",
    }

    if (!firebase.apps.length) {
      const firebaseApp = firebase.initializeApp(config)
      setApp(firebaseApp)
      setAuth(firebaseApp.auth())
      setFirestore(firebaseApp.firestore())
      console.log("Initialized app")
    }
  }, [])

  return {
    auth,
    app,
    firestore,
  }
}

export default useFirebase
