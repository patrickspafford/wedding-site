import React, { ChangeEvent, FormEvent, useState, useContext } from "react"
import Authenticated from "../components/Authenticated"
import { ApiContext } from "../contexts"
import Switch from "rc-switch"
import "rc-switch/assets/index.css"
import useFirestoreListener from "react-firestore-listener"
import { useWindowSize } from "rooks"

const RSVP = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)
  const { apiService } = useContext(ApiContext)
  const { innerWidth } = useWindowSize()

  const currentUserDoc = useFirestoreListener({
    collection: "users",
    refresh: [apiService.auth.currentUser],
    options: {
      conditions: [["uid", "==", apiService.auth.currentUser?.uid || ""]],
    },
  })

  const handleCheckboxChange = (attending: boolean) => {
    try {
      apiService.rsvpCurrentUser(attending)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)
      await apiService.addGuest({
        firstName,
        lastName,
      })
      setLoading(false)
      setFirstName("")
      setLastName("")
    } catch (err: any) {
      setLoading(false)
      alert(err?.message)
    }
  }

  const isAttending = currentUserDoc[0]?.rsvp ?? false

  return (
    <Authenticated>
      <div className="pt-8 h-screen bg-green">
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white max-w-2xl p-8 mt-8 rounded-md shadow-md"
          >
            <h1 className="text-4xl text-center mb-8 font-paris">RSVP</h1>
            <h2 className="md:text-3xl text-2xl text-center font-paris mb-16">
              Will You Be Attending?
            </h2>
            <div className="flex justify-center items-center">
              <div className="flex justify-evenly items-center">
                <label
                  className={`mr-8 font-semibold p-4 pl-8 pr-8 rounded-md ${
                    !isAttending && "bg-charcoal text-white"
                  }`}
                >
                  No
                </label>
                <Switch
                  onChange={handleCheckboxChange}
                  onClick={handleCheckboxChange}
                  checked={isAttending}
                />
                <label
                  className={`ml-8 font-semibold p-4 pl-8 pr-8 rounded-md ${
                    isAttending && "bg-charcoal text-white"
                  }`}
                >
                  Yes
                </label>
              </div>
            </div>
            <h2 className="md:text-3xl text-2xl text-center font-paris mt-16 mb-16">
              Please Add Your Guests
            </h2>
            <div className="flex justify-between mb-12 items-center">
              <label
                className="flex-1 font-semibold hidden md:block"
                htmlFor="First Name"
              >
                First Name
              </label>
              <input
                type="text"
                name="First Name"
                placeholder={
                  innerWidth && innerWidth <= 768 ? "First Name" : ""
                }
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="border-2 flex-1 h-12 rounded-md pl-4 focus:ring focus:outline-none"
              />
            </div>
            <div className="flex justify-between mb-12 items-center">
              <label
                htmlFor="Last Name"
                className="flex-1 font-semibold md:block hidden"
              >
                Last Name
              </label>
              <input
                type="text"
                className="border-2 flex-1 rounded-md h-12 pl-4 focus:ring focus:outline-none"
                name="Last Name"
                placeholder={innerWidth && innerWidth <= 768 ? "Last Name" : ""}
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex justify-center mb-4">
              <input
                type="submit"
                disabled={loading}
                value={loading ? "Loading..." : "Add Guest"}
                className="h-12 rounded-md w-full hover:opacity-50 cursor-pointer shadow-md font-semibold uppercase bg-charcoal text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </Authenticated>
  )
}

export default RSVP
