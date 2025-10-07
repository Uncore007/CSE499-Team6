'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

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

export default function GroceryItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<GroceryItem | null>(null)
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItem()
  }, [params.id])

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/grocery_items/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch item')
      const data = await response.json()
      setItem(data)

      if (data.store_id) {
        const storeRes = await fetch(`/api/stores/${data.store_id}`)
        if (storeRes.ok) {
          const storeData = await storeRes.json()
          setStore(storeData)
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/grocery_items/${params.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete item')
      router.push('/grocery-items')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  const togglePurchased = async () => {
    if (!item) return

    try {
      const response = await fetch(`/api/grocery_items/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_purchased: !item.is_purchased }),
      })
      if (!response.ok) throw new Error('Failed to update item')
      setItem({ ...item, is_purchased: !item.is_purchased })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  if (loading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading...</div>
  if (error) return <div className="p-6 bg-gray-900 min-h-screen text-red-600">Error: {error}</div>
  if (!item) return <div className="p-6 bg-gray-900 min-h-screen text-white">Item not found</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/grocery-items')}
          className="mb-6 text-orange-500 hover:text-orange-400"
        >
          ← Back to Grocery List
        </button>

        <div className="bg-gray-800 rounded-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-4xl ${
                item.is_purchased ? 'bg-green-600' : 'bg-orange-600'
              }`}>
                {item.is_purchased ? '✓' : '🛒'}
              </div>
              <div>
                <h1 className={`text-4xl font-bold ${item.is_purchased ? 'line-through text-gray-400' : ''}`}>
                  {item.name}
                </h1>
                <p className={`text-lg mt-2 ${item.is_purchased ? 'text-green-400' : 'text-orange-400'}`}>
                  {item.is_purchased ? 'Purchased' : 'Not Purchased'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={togglePurchased}
                className={`px-6 py-3 rounded font-semibold ${
                  item.is_purchased 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {item.is_purchased ? '↺ Mark Unpurchased' : '✓ Mark Purchased'}
              </button>
              <button
                onClick={() => router.push(`/grocery-items/${item.id}/edit`)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded font-semibold"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h2 className="text-xl font-semibold mb-4">Item Details</h2>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span className="font-semibold">Quantity:</span>
                <span>{item.quantity} {item.units || 'item(s)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Store:</span>
                <span>{store ? store.name : 'No store assigned'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span className={item.is_purchased ? 'text-green-400' : 'text-orange-400'}>
                  {item.is_purchased ? 'Purchased' : 'Not Purchased'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Added:</span>
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}