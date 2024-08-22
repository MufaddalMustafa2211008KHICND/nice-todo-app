import React, { useState, useEffect } from 'react'
import { useItems } from '@/contexts/crudContext/useItems'
import AddItemForm from './components/AddItemForm'
import EditItemForm from './components/EditItemForm'
import List from './components/List'
import Alert from './alert/Alert'

const Home: React.FC = () => {
  const { items, addItem, updateItem, deleteItem } = useItems()
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [alert, setAlert] = useState<{
    show: boolean
    msg: string
    type: string
  }>({
    show: false,
    msg: '',
    type: '',
  })

  useEffect(() => {
    console.log('Items:', items)
  }, [items])

  const handleAddItem = (title: string) => {
    addItem({ title })
    showAlert(true, 'Item added successfully', 'success')
  }

  const handleUpdateItem = (id: string, title: string) => {
    updateItem(id, { title })
    setEditingItemId(null)
    showAlert(true, 'Item updated successfully', 'success')
  }

  const handleDeleteItem = (id: string) => {
    deleteItem(id)
    showAlert(true, 'Item deleted successfully', 'danger')
  }

  const handleCancelEdit = () => {
    setEditingItemId(null)
  }

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type })
  }

  return (
    <section className="section-center">
      <div className="item-form">
        <h3 className='font-bold'>Items</h3>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} list={items} />
        )}
        <div className="form-control">
          {editingItemId ? (
            <EditItemForm
              itemId={editingItemId}
              items={items}
              onUpdate={handleUpdateItem}
              onCancel={handleCancelEdit}
            />
          ) : (
            <AddItemForm onAdd={handleAddItem} />
          )}
        </div>
      </div>
      <div className='list-container'>

      <List
        items={items}
        editItem={(id) => setEditingItemId(id)}
        removeItem={handleDeleteItem}
      />
      </div>

    </section>
  )
}

export default Home
