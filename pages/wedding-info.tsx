import React from "react"
import Layout from "../components/Layout"
import H1 from "../components/H1"
import H2 from "../components/H2"
import InfoItem from "../components/InfoItem"
import Paper from "../components/Paper"
import Image from "next/image"
import Lean from "../assets/lean.jpg"
import InfoSection from "../components/InfoSection"

const churchAddress = [
  ["Wedding", "St Dominic Catholic Church"],
  ["", "4156 Burma Road"],
  ["", "Mobile, AL 36693"],
]

const receptionAddress = [
  ["Reception", "Mobile Museum of Art"],
  ["", "4850 Museum Dr"],
  ["", "Mobile, AL 36608"],
]

const WeddingInfo = () => (
  <Layout>
    <div className="min-h-screen flex justify-center">
      <Paper>
        <H1>Wedding Info</H1>
        <div className="overflow-hidden justify-center flex items-center mb-16">
          <Image
            src={Lean}
            alt="Patrick and Alexandria Holding Each Other Close"
          />
        </div>
        <H2>When</H2>
        <InfoSection>
          <InfoItem left="Date" right="December 18th, 2021" />
          <InfoItem left="Time" right="6:30 pm" />
        </InfoSection>
        <H2>Where</H2>
        <InfoSection>
          {churchAddress.map((line, i) => (
            <InfoItem
              key={line[1]}
              left={line[0]}
              right={line[1]}
              itemStyle={i === churchAddress.length - 1 ? "mb-16" : ""}
            />
          ))}
          {receptionAddress.map((line, i) => (
            <InfoItem key={line[1]} left={line[0]} right={line[1]} />
          ))}
        </InfoSection>
        <H2>Dress</H2>
        <InfoSection>
          <InfoItem left="Attire" right={`"Black Tie Optional"`} />
        </InfoSection>
      </Paper>
    </div>
  </Layout>
)

export default WeddingInfo
