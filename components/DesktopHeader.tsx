import React from "react"
import Link from "next/link"

interface IDesktopHeader {
  navItems: {
    href: string
    title: string
  }[]
  loggedIn: boolean
  handleLogOut: () => void
}

const DesktopHeader = ({
  navItems,
  loggedIn,
  handleLogOut,
}: IDesktopHeader) => (
  <nav className="mr-8 hidden lg:flex">
    <ul className="flex-1 flex justify-evenly items-center gap-8">
      {navItems.map((item) => {
        return (
          <li
            key={item.href}
            className="hover:opacity-50 h-24 flex items-center"
          >
            <Link href={item.href}>{item.title}</Link>
          </li>
        )
      })}
      {loggedIn ? (
        <li
          onClick={handleLogOut}
          className="hover:opacity-50 h-24 flex items-center"
        >
          Log Out
        </li>
      ) : (
        <li className="hover:opacity-50 h-24 flex items-center">
          <Link href="/login">Log In</Link>
        </li>
      )}
    </ul>
  </nav>
)

export default DesktopHeader
