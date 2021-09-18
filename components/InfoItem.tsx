import React, { ReactNode, ChangeEvent } from "react"

interface IInfoItem {
  itemStyle?: string
  spanStyle?: string
  editable?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  left: ReactNode
  right: ReactNode
}

const InfoItem = ({
  itemStyle,
  spanStyle,
  left,
  right,
  editable,
  onChange,
}: IInfoItem) => (
  <div className={`flex items-center justify-between ${itemStyle} mb-8`}>
    <span className={`font-semibold text-lg ${spanStyle ?? ""}`}>{left}</span>
    {editable ? (
      <input
        type="text"
        className="border-2 rounded-md h-12 pl-4 focus:ring focus:outline-none"
        value={right?.toString()}
        required
        onChange={onChange}
      />
    ) : (
      <span className={`font-semibold text-lg ${spanStyle ?? ""}`}>
        {right}
      </span>
    )}
  </div>
)

export default InfoItem
