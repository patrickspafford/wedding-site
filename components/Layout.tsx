import React, { ReactNode, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { slide as ReactBurgerMenu } from "react-burger-menu"
import Link from "next/link"
import { useContext } from "react"
import { ApiContext } from "../contexts"
import { useEffect } from "react"
import { useRouter } from "next/router"

interface ILayout {
  children: ReactNode
  enforceLogin?: boolean
}

const navItems = [
  {
    title: "Wedding Info",
    href: "/wedding-info",
  },
  {
    title: "RSVP",
    href: "/rsvp",
  },
  {
    title: "Guests",
    href: "/guest-list",
  },
  {
    title: "Registry",
    href: "https://www.amazon.com/wedding/alexandria-hardy-patrick-spafford--december-2021/registry/2QEIYS43PBECA",
  },
  {
    title: "Share Photos",
    href: "/photos",
  },
]

const Layout = ({ children, enforceLogin = false }: ILayout) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()
  const { apiService } = useContext(ApiContext)

  useEffect(() => {
    if (apiService.auth.currentUser) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [apiService.auth.currentUser])

  const handleLogOut = async () => {
    try {
      await apiService.signOut()
      router.push("/login")
    } catch (err) {
      console.error(err)
      alert("Something went wrong, please try again.")
    }
  }

  return (
    <div id="outer-container">
      <Header
        navItems={navItems}
        toggleMenu={() => setMenuOpen(!menuOpen)}
        loggedIn={loggedIn}
        handleLogOut={handleLogOut}
      />
      <ReactBurgerMenu
        pageWrapId="page-wrap"
        outerContainerId="outer-container"
        customBurgerIcon={false}
        right
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuClassName="bg-charcoal"
      >
        {navItems.map((item, i) => (
          <li
            key={item.href}
            className={`text-white p-3 text-2xl hover:opacity-50 focus:outline-none ${
              i === 0 && "pt-8"
            }`}
          >
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
        {loggedIn ? (
          <li
            onClick={handleLogOut}
            className="text-white p-3 text-2xl hover:opacity-50"
          >
            Log Out
          </li>
        ) : (
          <li className="text-white p-3 text-2xl hover:opacity-50">
            <Link href="/login">Log In</Link>
          </li>
        )}
      </ReactBurgerMenu>
      <main id="page-wrap" className="min-h-screen pt-24 bg-green">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
