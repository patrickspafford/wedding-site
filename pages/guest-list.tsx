import React, { useContext } from "react"
import Authenticated from "../components/Authenticated"
import TableCell from "../components/TableCell"
import useFirestoreListener from "react-firestore-listener"
import { ApiContext } from "../contexts"

const GuestList = () => {
  const { apiService } = useContext(ApiContext)
  const users = useFirestoreListener({
    collection: "users",
    dataMapping: async (doc) => {
      const userPhoto = await apiService.userPhoto(doc.uid)
      return {
        ...doc,
        imageSrc: userPhoto,
      }
    },
    options: {
      conditions: [["rsvp", "==", true]],
    },
  })
  const guests = useFirestoreListener({
    collection: "guests",
  })

  const handleDeleteGuest = async (docId: string) => {
    try {
      await apiService.deleteGuest(docId)
    } catch (err) {
      console.error("Error deleting guest: ", err)
    }
  }

  return (
    <Authenticated>
      <div className="w-full p-8">
        <h1 className="text-3xl font-paris text-white mb-8 font-bold">
          Our Guests
        </h1>
        <ul>
          {users.map((user) => (
            <TableCell
              name={`${user.firstName} ${user.lastName}`}
              uid={user.uid}
              key={user.uid}
              docId={user.docId}
              canDelete={false}
              imageSrc={user.imageSrc}
            />
          ))}
          {guests.map((guest) => (
            <TableCell
              key={`${guest.firstName} ${guest.lastName}`}
              name={`${guest.firstName} ${guest.lastName}`}
              uid={guest.addedBy}
              docId={guest.docId}
              canDelete={
                apiService.auth.currentUser?.uid === guest.addedBy || false
              }
              onDelete={handleDeleteGuest}
              imageSrc=""
            />
          ))}
        </ul>
      </div>
    </Authenticated>
  )
}

export default GuestList
