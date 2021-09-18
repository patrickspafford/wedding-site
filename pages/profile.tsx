import React, { useContext, useState, ChangeEvent, FormEvent } from "react"
import Authenticated from "../components/Authenticated"
import H1 from "../components/H1"
import InfoItem from "../components/InfoItem"
import InfoSection from "../components/InfoSection"
import Paper from "../components/Paper"
import Image from "next/image"
import { ApiContext } from "../contexts"
import useFirestoreListener from "react-firestore-listener"
import { useEffect } from "react"

const Profile = () => {
  const { apiService } = useContext(ApiContext)
  const [loading, setLoading] = useState(false)
  apiService.profilePhotoRef
  const [imageUrl, setImageUrl] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const usersInFirestore = useFirestoreListener({
    collection: "users",
    refresh: [apiService.auth.currentUser, apiService.auth.currentUser?.uid],
    options: {
      conditions: [["uid", "==", apiService.auth.currentUser?.uid || ""]],
    },
  })

  const user = usersInFirestore[0]

  useEffect(() => {
    if (user && user.firstName && user.lastName) {
      console.log("Updated")
      setFirstName(user.firstName)
      setLastName(user.lastName)
    }
  }, [user])

  useEffect(() => {
    const effect = async () => {
      if (apiService.auth.currentUser?.uid) {
        const image = await apiService.userPhoto(
          apiService.auth.currentUser?.uid
        )
        setImageUrl(image)
      }
    }
    effect()
  }, [loading, apiService.auth.currentUser, apiService.auth.currentUser?.uid])

  const handleSetImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      if (e.target.files && e.target.files[0]) {
        const file = e.target?.files[0]
        await apiService.uploadProfilePhoto(file)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (firstName && lastName) {
        await apiService.updateName("firstName", firstName)
        await apiService.updateName("lastName", lastName)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Authenticated>
      <div className="m-auto justify-center flex">
        <Paper>
          <H1>Your Profile</H1>
          <form onSubmit={handleSubmit}>
            <div className="h-64 flex justify-center mt-16 mb-16">
              <Image
                height={250}
                width={250}
                placeholder="blur"
                objectFit="cover"
                alt="Profile"
                src={imageUrl || "https://picsum.photos/seed/picsum/250/250"}
                blurDataURL={
                  imageUrl || "https://picsum.photos/seed/picsum/250/250"
                }
              />
            </div>
            <div className="flex justify-center items-center">
              <input
                id="file-submit"
                type="file"
                onChange={handleSetImage}
                accept="image/jpeg, image/png, image/jpg, image/heic"
                hidden
              />
              <label
                htmlFor="file-submit"
                className="text-white bg-charcoal p-4 pl-8 pr-8 mb-8 rounded-md hover:opacity-50 cursor-pointer uppercase font-semibold text-center"
              >
                Update Photo
              </label>
            </div>
            <InfoSection>
              <InfoItem
                left="First Name"
                editable
                right={firstName}
                onChange={(t) => setFirstName(t.target.value)}
              />
              <InfoItem
                left="Last Name"
                editable
                right={lastName}
                onChange={(t) => setLastName(t.target.value)}
              />
            </InfoSection>
            <div className="flex justify-center mb-4">
              <input
                type="submit"
                disabled={loading}
                value={loading ? "Loading..." : "Update Name"}
                className="h-12 rounded-md w-full hover:opacity-50 cursor-pointer shadow-md font-semibold uppercase bg-charcoal text-white"
              />
            </div>
          </form>
        </Paper>
      </div>
    </Authenticated>
  )
}

export default Profile
