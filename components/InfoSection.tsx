import React, { ReactNode } from "react"

interface IInfoSection {
  children: ReactNode
  className?: string
}

const InfoSection = ({ children, className }: IInfoSection) => (
  <div
    className={`p-8 lg:pl-16 lg:pr-16 md:pl-8 md:pr-8 pl-4 pr-4 ${className}`}
  >
    {children}
  </div>
)

export default InfoSection
