import React, { ReactNode } from "react"

interface IInfoItem {
  itemStyle?: string
  spanStyle?: string
  left: ReactNode
  right: ReactNode
}

const InfoItem = ({ itemStyle, spanStyle, left, right }: IInfoItem) => (
  <div className={`flex items-center justify-between ${itemStyle} mb-8`}>
    <span className={`font-semibold text-lg ${spanStyle ?? ""}`}>{left}</span>
    <span className={`font-semibold text-lg ${spanStyle ?? ""}`}>{right}</span>
  </div>
)

export default InfoItem
