import React, { useState } from 'react'
import Alert from '../alert/Alert'

interface AddItemFormProps {
  onAdd: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormProps> = function ({ onAdd }) {
  const [title, setTitle] = useState('')

  const [alert, setAlert] = useState<{
    show: boolean
    msg: string
    type: string
  }>({
    show: false,
    msg: '',
    type: '',
  })

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type })
  }

  const handleAddClick = () => {
    if (title) {
      onAdd(title)
      setTitle('')
    } else {
      showAlert(true, 'Please enter a title', 'danger')
    }
  }

  return (
    <div>
      {alert.show && (
        <Alert
          type={alert.type}
          msg={alert.msg}
          removeAlert={showAlert}
          list={[]}
        />
      )}
      <div className="flex items-center rounded-md shadow-sm overflow-hidden">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="flex-1 px-4 py-2 text-gray-600 placeholder-gray-400 border-none focus:outline-none bg-gray-100"
        />
        <button
          type="button"
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-200 text-black font-medium focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default AddItemForm
