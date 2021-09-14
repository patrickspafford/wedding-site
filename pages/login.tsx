import firebase from "firebase"
import "firebase/auth"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Layout from "../components/Layout"

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
  firebase.initializeApp(config)
}

const Login = () => {
  const uiConfig = {
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/rsvp",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  }
  return (
    <Layout>
      <div className="flex items-start justify-center h-screen">
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </Layout>
  )
}

export default Login
