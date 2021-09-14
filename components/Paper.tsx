import React from "react"
import { ReactNode } from "react"

interface IPaper {
  children: ReactNode
}

const Paper = ({ children }: IPaper) => (
  <div className="w-full bg-white max-w-2xl p-8 mt-8 mb-8 rounded-md shadow-md">
    {children}
  </div>
)

export default Paper
