'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Navbar from '../../components/Navbar'

interface InventoryItem {
  id: string
  name: string
  in_stock: boolean
  user_id: string
  created_at: string
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory')
      if (!response.ok) throw new Error('Failed to fetch inventory')
      const data = await response.json()
      setItems(data)
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
      const response = await fetch(`/api/inventory/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete item')
      setItems(items.filter(item => item.id !== id))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  const toggleStock = async (item: InventoryItem) => {
    try {
      const response = await fetch(`/api/inventory/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ in_stock: !item.in_stock }),
      })
      if (!response.ok) throw new Error('Failed to update item')
      
      setItems(items.map(i => 
        i.id === item.id ? { ...i, in_stock: !i.in_stock } : i
      ))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  if (loading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading inventory...</div>
  if (error) return <div className="p-6 bg-gray-900 min-h-screen text-red-600">Error: {error}</div>

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-3 sm:p-4 md:p-6 md:ml-56">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">My Inventory</h1>
          <button
            onClick={() => router.push('/inventory/new')}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-sm sm:text-base transition whitespace-nowrap"
          >
            Add New Item
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-sm sm:text-base">No inventory items yet. Create your first item!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg p-4 sm:p-5 md:p-6 hover:shadow-lg transition ${
                  item.in_stock ? 'bg-gray-800' : 'bg-gray-800/50 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl ${
                      item.in_stock ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {item.in_stock ? '✓' : '✗'}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-1">{item.name}</h3>
                      <p className={`text-xs sm:text-sm ${item.in_stock ? 'text-green-400' : 'text-red-400'}`}>
                        {item.in_stock ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
                  <button
                    onClick={() => toggleStock(item)}
                    className={`flex-1 px-3 sm:px-4 py-2 rounded text-sm sm:text-base transition ${
                      item.in_stock 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {item.in_stock ? 'Mark Out' : 'Mark In'}
                  </button>
                  <button
                    onClick={() => router.push(`/inventory/${item.id}`)}
                    className="px-3 sm:px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded text-sm sm:text-base transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => router.push(`/inventory/${item.id}/edit`)}
                    className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm sm:text-base transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm sm:text-base transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}