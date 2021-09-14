import type { NextPage } from "next"
import H1 from "../components/H1"
import H2 from "../components/H2"
import Layout from "../components/Layout"
import Paper from "../components/Paper"
import Image from "next/image"
import Link from "next/link"
import Tropical from "../assets/tropical.jpg"

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center">
        <Paper>
          <H1>Alexandria &amp; Patrick&apos;s Wedding</H1>
          <Link passHref href="/login">
            <a className="block text-center mt-8 mb-8 p-4 pl-8 pr-8 max-w-xs m-auto rounded-md text-charcoal font-semibold shadow-md border-2 border-charcoal hover:opacity-50">
              Join Us
            </a>
          </Link>
          <div>
            <Image
              src={Tropical}
              alt="Patrick Kissing Alexandria in Tropical Setting"
            />
          </div>
          <H2>December 18th, 2021</H2>
        </Paper>
      </div>
    </Layout>
  )
}

export default Home
