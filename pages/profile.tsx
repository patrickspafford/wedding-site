import React from "react"
import Authenticated from "../components/Authenticated"
import H1 from "../components/H1"
import InfoItem from "../components/InfoItem"
import InfoSection from "../components/InfoSection"
import Paper from "../components/Paper"

const Profile = () => {
  return (
    <Authenticated>
      <div className="m-auto justify-center flex">
        <Paper>
          <H1>Your Profile</H1>
          <InfoSection>
            <InfoItem left="First Name" right="Bob" />
            <InfoItem left="Last Name" right="Dole" />
          </InfoSection>
        </Paper>
      </div>
    </Authenticated>
  )
}

export default Profile
