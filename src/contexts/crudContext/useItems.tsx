import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { firestore } from '@/configs/FirebaseConfig'

interface Item {
  id: string
  title: string
}

interface ItemContextType {
  items: Item[]
  addItem: (item: Omit<Item, 'id'>) => Promise<void>
  updateItem: (id: string, updatedItem: Partial<Item>) => Promise<Item | void>
  deleteItem: (id: string) => Promise<void>
}

const ItemContext = createContext<ItemContextType | undefined>(undefined)

export const useItems = function () {
  const context = useContext(ItemContext)
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider')
  }
  return context
}

interface ItemProviderProps {
  children: ReactNode
}

export const ItemProvider: React.FC<ItemProviderProps> = function ({
  children,
}) {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(firestore, 'items')
      const snapshot = await getDocs(itemsCollection)
      const itemsList = snapshot.docs.map(
        (document) => ({ ...document.data(), id: document.id }) as Item
      )
      setItems(itemsList)
    }

    fetchItems()
  }, [])

  const addItem = async (item: Omit<Item, 'id'>) => {
    try {
      console.log('Adding item:', item)
      const itemsCollection = collection(firestore, 'items')
      const docRef = await addDoc(itemsCollection, item)
      console.log('Document written with ID:', docRef.id)
      setItems((prevItems) => [...prevItems, { ...item, id: docRef.id }])
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error adding document:', error.message)
      } else {
        console.error('Unknown error adding document:', error)
      }
    }
  }

  const updateItem = async (id: string, updatedItem: Partial<Item>) => {
    try {
      console.log(`Updating item with id: ${id}`, updatedItem)
      const itemDoc = doc(firestore, 'items', id)
      await updateDoc(itemDoc, updatedItem)

      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
        console.log('Updated items:', updatedItems)
        return updatedItems
      })
    } catch (error) {
      console.error('Error updating document: ', error)
    }
  }

  const deleteItem = async (id: string) => {
    try {
      const itemDoc = doc(firestore, 'items', id)
      await deleteDoc(itemDoc)
      setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    } catch (error) {
      console.error('Error deleting document: ', error)
    }
  }

  return (
    <ItemContext.Provider
      value={useMemo(
        () => ({ items, addItem, updateItem, deleteItem }),
        [items]
      )}
    >
      {children}
    </ItemContext.Provider>
  )
}
