import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

interface ListProps {
  items: { id: string; title: string }[]
  editItem: (id: string) => void
  removeItem: (id: string) => void
}

const List: React.FC<ListProps> = ({ items, editItem, removeItem,  }) => {
  return (
    <div className="grocery-container mt-8">
      {items.map((item) => {
        const { id, title } = item
        return (
          <article
            key={id}
            className="flex items-center justify-between mb-2.5 p-1.5 rounded-md transition duration-300 ease-linear hover:bg-gray-200"
          >
            <p className="text-gray-800 mb-0 tracking-wide transition duration-300 ease-linear hover:text-gray-500">
              {title}
            </p>
            <div className="btn-container flex">
              <button
                type="button"
                className="text-green-400 hover:text-green-600 transition duration-300 ease-linear mr-1.5"
                onClick={() => {
                  console.log(`Edit button clicked for item with id: ${id}`)
                  editItem(id)
                }}
              >
                <FaEdit />
              </button>

              <button
                type="button"
                className="text-red-400 hover:text-red-600 transition duration-300 ease-linear"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
