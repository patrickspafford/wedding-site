import React, { useState, ReactNode, useEffect } from "react"
import { useContext } from "react"
import { ApiContext } from "../contexts"
import Layout from "./Layout"
import Link from "next/link"
import LoadingIndicator from "./LoadingIndicator"
import useFirestoreListener from "react-firestore-listener"

const timer = require("react-native-timer")

interface IAuthenticated {
  children: ReactNode
}

const timeoutKey = "timeoutKey"

const Authenticated = ({ children }: IAuthenticated) => {
  const { apiService } = useContext(ApiContext)

  const [loading, setLoading] = useState(true)
  const [timedOut, setTimedOut] = useState(false)
  const userDocs = useFirestoreListener({
    collection: "users",
    refresh: [
      apiService.auth.currentUser,
      apiService.auth.currentUser?.uid,
      apiService.auth.currentUser?.displayName,
    ],
    options: {
      conditions: [["uid", "==", apiService.auth.currentUser?.uid || ""]],
    },
  })

  const userDoc = userDocs[0]

  useEffect(() => {
    if (apiService.auth.currentUser && userDoc?.firstName) {
      setLoading(false)
      setTimedOut(false)
    }
  }, [apiService.auth.currentUser, userDoc])

  useEffect(() => {
    if (loading) {
      timer.setTimeout(
        timeoutKey,
        () => {
          setLoading(false)
          setTimedOut(true)
        },
        10000
      )
    } else {
      timer.clearTimeout(timeoutKey)
    }
    return () => {
      timer.clearTimeout(timeoutKey)
    }
  }, [loading])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen justify-center flex items-center">
          <div>
            <LoadingIndicator />
            <p className="text-white font-semibold p-4">Authenticating...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (timedOut) {
    return (
      <Layout>
        <div className="min-h-screen justify-center flex items-center">
          <div>
            <p>Please log in to view this page.</p>
            <Link passHref href="/login">
              <a className="block text-center mt-8 mb-8 p-4 pl-8 pr-8 max-w-xs m-auto rounded-md text-charcoal font-semibold shadow-md border-2 border-charcoal hover:opacity-50 bg-white">
                Log In
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return <Layout>{children}</Layout>
}

export default Authenticated
