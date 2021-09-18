import React from "react"

interface IMobileHeader {
  toggleMenu: () => void
}

const MobileHeader = ({ toggleMenu }: IMobileHeader) => (
  <div className="md:mr-8 mr-4 flex lg:hidden justify-end items-center">
    <div className="w-16 hover:opacity-50 cursor-pointer" onClick={toggleMenu}>
      {[0, 1, 2].map((idx) => (
        <span key={idx} className="block m-2 bg-white h-1"></span>
      ))}
    </div>
  </div>
)

export default MobileHeader
