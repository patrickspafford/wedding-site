import React from "react"
import CloseUp from "../assets/close.jpg"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"

import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"

interface IHeader {
  navItems: {
    title: string
    href: string
  }[]
  toggleMenu: () => void
  handleLogOut: () => void
  loggedIn: boolean
}

const Header = ({ navItems, toggleMenu, handleLogOut, loggedIn }: IHeader) => (
  <>
    <Head>
      <title>Alexandria &amp; Patrick</title>
      <meta
        name="description"
        content="Wedding Site for Patrick Spafford &amp; Alexandria Hardy."
      />
      <link rel="icon" href="/favicon.ico?v=3" />
      <link
        rel="preload"
        href="/fonts/Parisienne-Regular.ttf"
        as="font"
        crossOrigin=""
      />
    </Head>
    <header className="fixed h-24 bg-charcoal w-screen shadow-md flex items-stretch z-10">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-5">
          <Link href="/">
            <a className="w-24 flex justify-center items-center overflow-hidden">
              <Image
                src={CloseUp}
                objectFit="cover"
                height={96}
                width={96}
                alt="Alexandria and Patrick Close Together"
              />
            </a>
          </Link>
          <span className="font-paris text-3xl">Alexandria &amp; Patrick</span>
        </div>
        <DesktopHeader
          navItems={navItems}
          handleLogOut={handleLogOut}
          loggedIn={loggedIn}
        />
        <MobileHeader toggleMenu={toggleMenu} />
      </div>
    </header>
  </>
)

export default Header
