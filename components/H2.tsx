import React, { ReactNode } from "react"

interface IH2 {
  className?: string
  children: ReactNode
}

const H2 = ({ className, children }: IH2) => (
  <h2
    className={`text-3xl text-charcoal font-paris mt-8 mb-8 text-center ${className}`}
  >
    {children}
  </h2>
)

export default H2
