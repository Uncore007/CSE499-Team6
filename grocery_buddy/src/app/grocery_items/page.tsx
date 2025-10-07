'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Navbar from '../../components/Navbar'

interface GroceryItem {
  id: string
  name: string
  quantity: number
  units: string | null
  is_purchased: boolean
  store_id: string | null
  user_id: string
  created_at: string
}

interface Store {
  id: string
  name: string
}

export default function GroceryItemsPage() {
  const [items, setItems] = useState<GroceryItem[]>([])
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [itemsRes, storesRes] = await Promise.all([
        fetch('/api/grocery_items'),
        fetch('/api/stores')
      ])
      
      if (!itemsRes.ok) throw new Error('Failed to fetch grocery items')
      if (!storesRes.ok) throw new Error('Failed to fetch stores')
      
      const itemsData = await itemsRes.json()
      const storesData = await storesRes.json()
      
      setItems(itemsData)
      setStores(storesData)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/grocery_items/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete item')
      setItems(items.filter(item => item.id !== id))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  const togglePurchased = async (item: GroceryItem) => {
    try {
      const response = await fetch(`/api/grocery_items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_purchased: !item.is_purchased }),
      })
      if (!response.ok) throw new Error('Failed to update item')
      
      setItems(items.map(i => 
        i.id === item.id ? { ...i, is_purchased: !i.is_purchased } : i
      ))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  const getStoreName = (storeId: string | null) => {
    if (!storeId) return 'No store assigned'
    const store = stores.find(s => s.id === storeId)
    return store ? store.name : 'Unknown store'
  }

  if (loading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading grocery items...</div>
  if (error) return <div className="p-6 bg-gray-900 min-h-screen text-red-600">Error: {error}</div>

  const unpurchasedItems = items.filter(item => !item.is_purchased)
  const purchasedItems = items.filter(item => item.is_purchased)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-6 md:ml-56">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Grocery List</h1>
          <button
            onClick={() => router.push('/grocery-items/new')}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold"
          >
            Add Item
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No grocery items yet. Add your first item!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Unpurchased Items */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Shopping List ({unpurchasedItems.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unpurchasedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800 rounded-lg p-4 hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-400">
                          {item.quantity} {item.units || 'item(s)'}
                        </p>
                        <p className="text-sm text-violet-400 mt-1">
                          📍 {getStoreName(item.store_id)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => togglePurchased(item)}
                        className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
                      >
                        ✓ Mark Purchased
                      </button>
                      <button
                        onClick={() => router.push(`/grocery-items/${item.id}/edit`)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchased Items */}
            {purchasedItems.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-400">Purchased ({purchasedItems.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {purchasedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-800/50 rounded-lg p-4 opacity-75"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold line-through text-gray-400">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.quantity} {item.units || 'item(s)'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            📍 {getStoreName(item.store_id)}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePurchased(item)}
                          className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm"
                        >
                          ↺ Mark Unpurchased
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  )
}