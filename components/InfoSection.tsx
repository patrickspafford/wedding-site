import React, { ReactNode } from "react"

interface IInfoSection {
  children: ReactNode
  className?: string
}

const InfoSection = ({ children, className }: IInfoSection) => (
  <div className={`p-8 pl-16 pr-16 ${className}`}>{children}</div>
)

export default InfoSection
