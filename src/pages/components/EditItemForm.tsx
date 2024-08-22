import React, { useState, useEffect } from 'react'

interface EditItemFormProps {
  itemId: string | null
  items: { id: string; title: string }[]
  onUpdate: (id: string, title: string) => void
}

const EditItemForm: React.FC<EditItemFormProps> = function ({
  itemId,
  items,
  onUpdate,
}) {
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (itemId) {
      const item = items.find((i) => i.id === itemId)
      if (item) {
        setTitle(item.title)
      }
    }
  }, [itemId, items])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (itemId) {
      onUpdate(itemId, title)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="flex-1 px-4 py-2 text-gray-600 placeholder-gray-400 border-none focus:outline-none bg-gray-100"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-200 text-black font-medium focus:outline-none"
      >
        Update
      </button>
    </form>
  )
}

export default EditItemForm
