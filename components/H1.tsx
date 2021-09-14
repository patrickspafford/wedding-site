import React from "react"
import { ReactNode } from "react"

interface IH1 {
  className?: string
  children: ReactNode
}

const H1 = ({ className, children }: IH1) => (
  <h1
    className={`text-4xl text-charcoal font-paris mt-8 mb-16 text-center ${className}`}
  >
    {children}
  </h1>
)

export default H1
