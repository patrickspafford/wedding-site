import React from "react"
import { FaTrash, FaUser, FaUserCircle } from "react-icons/fa"
import Image from "next/image"
interface ITableCell {
  uid: string
  docId: string
  imageSrc: string
  name: string
  canDelete: boolean
  onDelete?: (id: string) => void
}

const TableCell = ({
  imageSrc,
  name,
  canDelete,
  onDelete,
  uid,
  docId,
}: ITableCell) => (
  <li className="h-24 shadow-lg flex justify-between items-center pr-4 rounded-md mb-4 bg-white">
    <div className="flex items-center justify-between">
      <div className="h-24 w-24 overflow-hidden flex-shrink-0 rounded-l-md flex items-center">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Profile"
            height={96}
            width={96}
            objectFit="cover"
          />
        ) : (
          <FaUser className="text-4xl m-auto pt-2 align-middle" />
        )}
      </div>
      <div className="h-24 flex justify-center items-center">
        <span className="ml-8 overflow-ellipsis overflow-hidden max-h-full">
          {name}
        </span>
      </div>
    </div>
    {canDelete ? (
      <button
        className="ml-4 p-4 hover:opacity-50"
        onClick={() => {
          if (onDelete) {
            onDelete(docId)
          }
        }}
      >
        <FaTrash className="text-2xl" />
      </button>
    ) : (
      <span className="ml-4 p-4" />
    )}
  </li>
)

export default TableCell
